import { Dialog } from "#/shared/ui/Dialog";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { updateUserName } from "#/features/auth/api/auth";
import { deleteAccount } from "#/features/auth/api/deleteAccount";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

const MAX_USERNAME_LENGTH = 20;

export default function SettingsModal({ isOpen, onClose, user, dbUser }: { isOpen: boolean, onClose: () => void, user: any, dbUser: any }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [username, setUsername] = useState(dbUser?.name || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const updateUserNameFn = useServerFn(updateUserName);
  const deleteAccountFn = useServerFn(deleteAccount);
  const router = useRouter();

  const usernameExceedsLimit = username.length > MAX_USERNAME_LENGTH;

  useEffect(() => {
    if (dbUser?.name) setUsername(dbUser.name);
  }, [dbUser]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateUserNameFn({ data: { name: username } });
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Profile updated successfully");
        await router.invalidate();
        onClose();
      }
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Manage Account" className="max-w-md">
      <div className="flex flex-col gap-6">

        {!showDeleteConfirm ? (
          <div className="space-y-4">
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">Username</span>
                  <span className={`label-text-alt tabular-nums ${usernameExceedsLimit ? 'text-error' : 'opacity-50'}`}>
                    {username.length}/{MAX_USERNAME_LENGTH}
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={MAX_USERNAME_LENGTH}
                  className={`input w-full ${usernameExceedsLimit ? 'input-error' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            <div className="flex flex-col w-full">
              <label className="label ">Email</label>
              <input type="email" className="input w-full" value={user?.email || ""} disabled />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            <p className="text-sm font-medium">
              This action is irreversible. Type <strong className="font-bold text-error">DELETE</strong> to confirm.
            </p>
            <input
              type="text"
              className="input input-bordered border-error/30 w-full focus:border-error focus:ring-error"
              placeholder="Type DELETE"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col mt-2 space-y-2">
          {!showDeleteConfirm ? (
            <>
              <button className="btn btn-primary" disabled={isSaving || usernameExceedsLimit} onClick={handleSave}>
                {isSaving && <span className="loading loading-spinner loading-sm" />} Save Changes
              </button>
              <button className="btn btn-outline" disabled={isSaving} onClick={onClose}>Cancel</button>
              <button disabled={isSaving} className="btn btn-ghost btn-error text-error/70" onClick={() => setShowDeleteConfirm(true)}>Want to delete your account?</button>
            </>
          ) : (
            <>
              <button
                className="btn btn-error mt-2"
                disabled={deleteInput !== 'DELETE' || isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await deleteAccountFn();
                    toast.success("Account deleted successfully.");
                    window.location.href = '/'; // Redirect home and reload session
                  } catch (e: any) {
                    toast.error(e.message || "Failed to delete account.");
                  } finally {
                    setIsDeleting(false);
                    onClose();
                    setShowDeleteConfirm(false);
                    setDeleteInput("");
                  }
                }}

              >
                {isDeleting ? <span className="loading loading-spinner loading-sm" /> : "Delete Account"}
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteInput("");
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
