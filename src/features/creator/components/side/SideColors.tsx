import SideColorChanger from "./SideColorChanger";


export default function SideColors() {
    return <div>
        <div className="[&>div>p]:font-semibold [&>div>p]:mt-2 text-xs">
            <div>
                <p>Base</p>
                <SideColorChanger color="base-100" />
                <SideColorChanger color="base-200" />
                <SideColorChanger color="base-300" />
                <SideColorChanger color="base-content" />
            </div>
            <div>
                <p>Primary</p>
                <SideColorChanger color="primary" />
                <SideColorChanger color="primary-content" />
            </div>
            <div>
                <p>Secondary</p>
                <SideColorChanger color="secondary" />
                <SideColorChanger color="secondary-content" />
            </div>
            <div>
                <p>Accent</p>
                <SideColorChanger color="accent" />
                <SideColorChanger color="accent-content" />
            </div>
            <div>
                <p>Neutral</p>
                <SideColorChanger color="neutral" />
                <SideColorChanger color="neutral-content" />
            </div>
            <div>
                <p>Info</p>
                <SideColorChanger color="info" />
                <SideColorChanger color="info-content" />
            </div>
            <div>
                <p>Success</p>
                <SideColorChanger color="success" />
                <SideColorChanger color="success-content" />
            </div>
            <div>
                <p>Warning</p>
                <SideColorChanger color="warning" />
                <SideColorChanger color="warning-content" />
            </div>
            <div>
                <p>Error</p>
                <SideColorChanger color="error" />
                <SideColorChanger color="error-content" />
            </div>

        </div>
    </div>
}