import { PreviewFrame } from '#/features/creator/components/preview/PreviewFrame';
import CopyModal from '#/features/themes/components/theme/CopyModal';
import { Dialog } from '#/shared/ui/Dialog';

import { compileCss } from '#/features/creator/api/compileCss';
import { deleteTheme } from '#/features/themes/api/deleteTheme';
import { getThemeById } from '#/features/themes/api/getThemeById';
import { toggleLike } from '#/features/themes/api/toggleLike';
import { useAuthModalStore } from '#/features/auth/store/authModalStore';
import { useThemeStore } from '#/features/creator/store/themeStore';
import type { CssTheme } from '#/shared/types/theme';
import type { DatabaseTheme } from '#/shared/types/db';
import { CalendarIcon, CodeBracketIcon as Code, PencilSquareIcon as Edit, HeartIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { createFileRoute, useLoaderData, useNavigate, Await } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/theme/$themeId')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Theme Details — DaisyThemer' },
      { name: 'description', content: 'View, copy, and edit this DaisyUI theme.' }
    ]
  }),
  loader: (data) => {
    const id = data.params.themeId;
    const themePromise = getThemeById({ data: { id } }).then(theme => {
      if (!theme) {
        throw new Error("Theme not found");
      }
      return theme;
    });

    return { deferredTheme: themePromise };
  }
})

function RouteComponent() {
  const { deferredTheme } = Route.useLoaderData();

  return (
    <Await promise={deferredTheme} fallback={<RouteSkeleton />}>
      {(theme) => <ThemeDetail theme={theme} />}
    </Await>
  );
}

function RouteSkeleton() {
  return (
    <main className='page-wrap'>
      <div className='flex flex-col md:flex-row gap-5 items-start justify-between'>
        <div className='flex flex-col gap-4'>
          <div className="skeleton h-10 w-48"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>

        <div className='flex gap-2 hidden md:flex'>
          <div className="skeleton h-10 w-24 rounded-btn"></div>
          <div className="skeleton h-10 w-24 rounded-btn"></div>
        </div>
      </div>

      <div className='w-full mt-8'>
        <div className="skeleton w-full h-[70vh] rounded-box opacity-50"></div>
      </div>
    </main>
  );
}

function ThemeDetail({ theme }: { theme: DatabaseTheme }) {
  const { user } = useLoaderData({ from: '__root__' }) as any;
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const parsedTheme = theme.theme_code;
  const [isLiked, setIsLiked] = useState<boolean>(theme.is_liked);
  const [liking, setIsLiking] = useState(false)
  const [likesCount, setLikesCount] = useState<number>(theme.likes ?? 0);
  const toggleLikeFn = useServerFn(toggleLike);
  const deleteThemeFn = useServerFn(deleteTheme);

  const navigate = useNavigate({ from: Route.id });
  const setCssTheme = useThemeStore(state => state.setCssTheme);
  const setThemeName = useThemeStore(state => state.setThemeName);
  const setCssOverrides = useThemeStore(state => state.setCssOverrides);
  const { openModal } = useAuthModalStore();
  const compileCssFn = useServerFn(compileCss);
  const [compiledOverrides, setCompiledOverrides] = useState<string>("");

  useEffect(() => {
    if (theme.overrides) {
      compileCssFn({ data: theme.overrides }).then((res) => {
        if (res.success) {
          setCompiledOverrides(res.css);
        }
      });
    }
  }, [theme.overrides, compileCssFn]);

  const handleLike = useCallback(async () => {
    if (!user) {
      openModal('login');
      return;
    }

    const prevIsLiked = isLiked;
    const prevCount = likesCount;

    setIsLiking(true)
    setIsLiked(!prevIsLiked);
    setLikesCount(prevIsLiked ? prevCount - 1 : prevCount + 1);

    try {
      const result = await toggleLikeFn({ data: { themeId: theme.id } });
      setIsLiked(result.isLiked);
      setLikesCount(result.likesCount);
    } catch {
      setIsLiked(prevIsLiked);
      setLikesCount(prevCount);
      toast.error("Failed to update like status.");
    } finally {
      setIsLiking(false)
    }
  }, [isLiked, likesCount, user, theme.id, toggleLikeFn, openModal]);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await deleteThemeFn({ data: { themeId: theme.id } });
      toast.success("Theme deleted.");
      navigate({ to: '/browse' });
    } catch (e: any) {
      toast.error(e.message || "Failed to delete theme.");
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }, [theme.id, deleteThemeFn, navigate]);

  const parsedCssObject = parsedTheme;

  const handleOpenInEditor = () => {
    setThemeName(theme.name);
    setCssTheme(parsedCssObject as CssTheme);
    setCssOverrides(theme.overrides || "");
    navigate({ to: '/create' });
  };

  return <main className='page-wrap'>
    <div className='flex flex-col md:flex-row gap-5 items-start justify-between'>
      <div className='flex  flex-col gap-3 justify-between'>
        <h1 className='text-4xl font-bold capitalize' style={{
          fontFamily: parsedTheme?.font || '"DM Sans", sans-serif'

        }}>{theme.name}</h1>
        <div className='flex gap-1.5    text-sm  items-center'>
          <div className='flex  gap-4 items-center   '>
            <span className='flex gap-1 items-center text-base-content/70'>
              <UserIcon className='size-3.5' />{theme.user_id.name || "Anonymous"}
            </span>
            <span className='flex gap-1 items-center text-base-content/70'>
              <CalendarIcon className='size-3.5 ' />
              {dayjs(theme.created_at).format('MMM DD, YYYY')}
            </span>

            <span className='flex gap-1 items-center text-base-content/70'>
              <HeartIcon className='size-3.5 ' />
              <p className='  '>{likesCount}{" "}Likes</p>
            </span>
          </div>
        </div>
        <div className='flex gap-1.5 mt-0.5 flex-wrap'>
          {theme.tags?.map((tag: string, i: number) => (
            <span key={i} className='badge badge-soft badge-sm'>{tag}</span>
          ))}
        </div>
      </div>

      <div className='flex items-center gap-1.5 flex-wrap justify-start'>
        <button
          disabled={liking}
          className={`btn mr-0.5 btn-outline ${isLiked ? 'border-red-400/30! bg-red-400/10!' : ''}`}
          onClick={handleLike}
        >
          {isLiked ? <HeartIconSolid className='size-3.5 text-red-400' /> : <HeartIcon className='size-3.5' />}
          {likesCount} Likes
        </button>
        {/*TODO: Replace with HEROICON COPIER */}
        <button className='btn btn-outline  ' onClick={() => setIsCopyModalOpen(true)}><Code className='size-3 mr-0.5' />  Code</button>
        <button className='btn btn-outline  ' onClick={handleOpenInEditor}><Edit className='size-3 mr-0.5' />  Open in Editor</button>

        {theme.is_owner && (
          <button
            className='btn btn-outline'
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <TrashIcon className='size-3.5' /> Delete
          </button>
        )}
      </div>
    </div>

    <CopyModal isOpen={isCopyModalOpen} onClose={() => setIsCopyModalOpen(false)} theme={theme} />

    {/* Delete confirmation modal */}
    <Dialog
      isOpen={isDeleteModalOpen}
      onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
      title="Delete Theme"
      className="max-w-sm"
    >
      <p className="text-base-content/70 text-sm mb-6">
        Are you sure you want to delete <strong className="text-base-content">{theme.name}</strong>? This action cannot be undone.
      </p>
      <div className="flex gap-2 justify-end">
        <button
          className="btn btn-ghost"
          disabled={isDeleting}
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-error"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? <span className="loading loading-spinner loading-sm" /> : 'Delete'}
        </button>
      </div>
    </Dialog>

    <div className='w-full mt-8    '>
      <PreviewFrame overrides={theme.overrides || ""} compiledOverrides={compiledOverrides} hideEditor creating={false} theme={parsedCssObject as CssTheme} />
    </div>

  </main>
}
