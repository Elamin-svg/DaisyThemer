import SideColors from "./SideColors";
import SideFont from "./SideFont";
import SideRadius from "./SideRadius";
import SideSizes from "./SideSizes";
import SideEffects from "./SideEffects";
import SideBorder from "./SideBorder";
import SideOptions from "./SideOptions";

import { StarIcon as Star, ViewColumnsIcon as Ruler, ViewfinderCircleIcon as SquareDashed, StopIcon as Square, AdjustmentsHorizontalIcon as Settings2, Bars3BottomLeftIcon as Type } from '@heroicons/react/24/outline';

export default function CreateSide() {
    return (
        <div className="bg-base-200 sm:max-h-[calc(100vh-14rem)] border border-base-300 rounded-box p-4 h-full flex flex-col gap-6 overflow-y-auto">


            <SideColors />

            <div className="divider mt-6 divider-start m-0 text-xs text-base-content"><Type className="w-4 h-4 opacity-70" /> Typography</div>
            <SideFont />

            <div className="divider  divider-start m-0 text-xs text-base-content"><SquareDashed className="w-4 h-4 opacity-70" /> Radius</div>
            <SideRadius />

            <div className="divider mt-6 divider-start m-0 text-xs text-base-content"><Star className="w-4 h-4 opacity-70" /> Effects</div>
            <SideEffects />

            <div className="divider mt-6 divider-start m-0 text-xs text-base-content"><Ruler className="w-4 h-4 opacity-70" /> Sizes</div>
            <SideSizes />

            <div className="divider mt-6 divider-start m-0 text-xs text-base-content"><Square className="w-4 h-4 opacity-70" /> Border</div>
            <SideBorder />

            <div className="divider mt-6 divider-start m-0 text-xs text-base-content"><Settings2 className="w-4 h-4 opacity-70" /> Options</div>
            <SideOptions />

        </div>
    )
}