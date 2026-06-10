import { compileCss } from '#/features/creator/api/compileCss';
import { useThemeStore } from '#/features/creator/store/themeStore';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CssEditor() {
    const { cssOverrides, setCompiledCssOverrides, setCssOverrides } = useThemeStore();
    const [hasUserEditSinceLastCompile, setHasUserEditSinceLastCompile] = useState<boolean>(false);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleEditorChange = async (value: string | undefined) => {
        setIsCompiling(true);
        try {
            if (value && value?.length > 0) {
                const compiled = await compileCss({
                    data: value
                })
                if (compiled) {
                    setCompiledCssOverrides(compiled.success ? compiled.css : "");
                    setCssOverrides(value);
                    setHasUserEditSinceLastCompile(false);
                    if (compiled.success) {
                        toast.success('CSS compiled successfully');
                    } else {
                        toast.error('Failed to compile CSS');
                    }
                }

            } else {
                setCssOverrides("");
                setCompiledCssOverrides("")
                toast.info('CSS overrides cleared');
            }
        } catch {
            toast.error('An error occurred during compilation');
            return
        } finally {
            setIsCompiling(false);
            setHasUserEditSinceLastCompile(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full h-full ">

            <div className="flex-1 relative overflow-hidden">
                <Editor

                    defaultLanguage="css"
                    onChange={(val) => {
                        setHasUserEditSinceLastCompile(true);
                        setCssOverrides(val as string)
                    }}
                    theme="vs-dark"
                    value={cssOverrides}
                    options={{
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        folding: false,
                        lineDecorationsWidth: 20,
                        lineNumbersMinChars: 3,
                    }}
                    className="w-full h-156       h-full rounded-box"
                />
                <button
                    onClick={() => handleEditorChange(cssOverrides)}
                    disabled={!hasUserEditSinceLastCompile || isCompiling}
                    className='btn btn-neutral absolute bottom-6 right-6 z-10 shadow-lg'
                >
                    {isCompiling && <span className="loading loading-spinner loading-sm"></span>}
                    Apply Styles
                </button>

            </div>

        </div>
    );
}
