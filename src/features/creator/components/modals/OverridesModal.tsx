import { Dialog } from "#/shared/ui/Dialog";
import CssEditor from "../editor/CssEditor";

export default function OverridesModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="CSS Overrides" className="max-w-4xl w-full h-[80vh]">
            <div className="w-full h-full min-h-[400px]">
                <CssEditor />
            </div>
        </Dialog>
    );
}
