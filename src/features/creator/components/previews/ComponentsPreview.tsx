import {
    AdjustmentsHorizontalIcon,
    ArrowPathIcon,
    ArrowsRightLeftIcon,
    ArrowTrendingUpIcon,
    BackwardIcon,
    ChartPieIcon,
    ChatBubbleOvalLeftIcon,
    CheckBadgeIcon,
    CircleStackIcon,
    Cog6ToothIcon,
    CubeIcon,
    EnvelopeIcon,
    ForwardIcon,
    InboxIcon,
    KeyIcon,
    LockClosedIcon,
    MusicalNoteIcon,
    PencilIcon,
    PhoneIcon,
    PlayIcon,
    ShieldExclamationIcon,
    SpeakerWaveIcon,
    UserIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import {
    CheckCircleIcon as CheckCircleSolid,
    ShieldCheckIcon as ShieldCheckSolid,
    XCircleIcon as XCircleSolid,
} from "@heroicons/react/24/solid";
import {
    KeyIcon as KeySolid,
    MagnifyingGlassIcon as MagnifyingGlassSolid,
    UserIcon as UserSolid,
    XMarkIcon as XMarkSolid,
} from "@heroicons/react/16/solid";
import { useState } from "react";

export default function ComponentsPreview() {
    const [sliderValue, setSliderValue] = useState(50);
    const currentMonth = new Date().toLocaleString("default", { month: "long" });

    return (
        <div className="text-base-content pt-6 bg-base-200 transition-colors duration-500">
            <div className="px-8 py-6">
                <div className="text-base-content mx-auto grid gap-6 pb-20 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 [&_.carbon-responsive-wrap]:flex-nowrap! [&_.carbon-responsive-wrap]:text-[11px]! [&_:is(div,button)]:[transition:background-color_0ms,border-color_100ms,box-shadow_300ms,border-radius_500ms_ease-out] [&>*]:mb-6">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">

                        {/* Filters card */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm">
                            <div className="card-body gap-4">
                                <h2 className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <ChartPieIcon className="size-5 opacity-40" />
                                        Preview
                                    </span>
                                    <span className="link text-xs">more</span>
                                </h2>
                                <div className="flex gap-1.5">
                                    <span className="badge badge-soft">Shoes <XMarkSolid className="size-3" /></span>
                                    <span className="badge badge-soft">Bags <XMarkSolid className="size-3" /></span>
                                </div>
                                <div className="flex flex-col">
                                    {[
                                        { label: "Hoodies", count: "25", checked: true, badgeClass: "badge-neutral" },
                                        { label: "Bags", count: "3", checked: true, badgeClass: "badge-neutral" },
                                        { label: "Shoes", count: "0", checked: false, badgeClass: "badge-warning" },
                                        { label: "Accessories", count: "4", checked: false, badgeClass: "badge-neutral" },
                                    ].map((item) => (
                                        <div key={item.label} className="border-b-base-content/5 flex items-center justify-between gap-2 border-b border-dashed py-2">
                                            <label className="flex cursor-pointer items-center gap-2 select-none">
                                                <input type="checkbox" className="checkbox checkbox-sm" defaultChecked={item.checked} />
                                                <span>{item.label}</span>
                                            </label>
                                            <span className={`badge badge-xs ${item.badgeClass} font-mono`}>{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Calendar card */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm overflow-hidden">
                            <div className="card-body gap-4">
                                <div className="border-b-base-300 grid grid-cols-7 border-b border-dashed pb-3">
                                    {[
                                        { day: "12", label: "M", active: false },
                                        { day: "13", label: "T", active: false },
                                        { day: "14", label: "W", active: true },
                                        { day: "15", label: "T", active: false },
                                        { day: "16", label: "F", active: false },
                                        { day: "17", label: "S", active: false },
                                        { day: "18", label: "S", active: false },
                                    ].map((d) => (
                                        <div key={d.day} className={`rounded-field flex flex-col items-center px-2 py-1 ${d.active ? "bg-primary text-primary-content" : ""}`}>
                                            <span className="text-sm font-semibold">{d.day}</span>
                                            <span className="text-[10px] font-semibold opacity-50">{d.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="input input-sm input-border flex w-auto items-center gap-2">
                                        <MagnifyingGlassSolid className="size-4" />
                                        <input type="text" placeholder="Search for events" />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input type="checkbox" className="toggle toggle-sm toggle-primary" defaultChecked />
                                        <span className="text-xs">Show all day events</span>
                                    </label>
                                </div>
                            </div>
                            <div className="bg-base-300">
                                <div className="flex items-center gap-2 p-4">
                                    <div className="grow">
                                        <div className="text-sm font-medium">Team Sync Meeting</div>
                                        <div className="text-xs opacity-60">Weekly product review with design and development teams</div>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="badge badge-sm badge-neutral">1h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div>
                            <div role="tablist" className="tabs tabs-lift">
                                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
                                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>
                                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" defaultChecked />
                                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>
                                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
                                <div className="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
                            </div>
                        </div>

                        {/* Range / Price */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm">
                            <div className="card-body gap-4">
                                <h2 className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <Cog6ToothIcon className="size-5 opacity-40" />
                                        Price range
                                    </span>
                                </h2>
                                <div className="text-center text-5xl font-extralight">{sliderValue}</div>
                                <input type="range" className="range range-sm" value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
                            </div>
                        </div>

                        {/* Product */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm">
                            <figure className="p-2">
                                <img className="rounded-[calc(var(--radius-box)-.5rem)]" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                            </figure>
                            <div className="card-body gap-4">
                                <h2 className="flex items-center justify-between">
                                    <span className="font-semibold">Nike Shoes</span>
                                    <span className="badge badge-success badge-sm">SALE</span>
                                </h2>
                                <div className="flex items-center gap-2">
                                    <div className="rating rating-xs">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <input key={i} type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" defaultChecked={i === 5} />
                                        ))}
                                    </div>
                                    <span className="text-xs opacity-60">420 reviews</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-semibold">$120</span>
                                    <span className="text-sm line-through opacity-60">$150</span>
                                </div>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm">
                            <div className="card-body gap-4">
                                <div className="join">
                                    <label className="join-item input-border input flex w-auto items-center gap-2">
                                        <MagnifyingGlassSolid className="size-4 shrink-0 opacity-70" />
                                        <input type="text" className="grow" placeholder="Search" />
                                    </label>
                                    <button className="join-item btn btn-neutral">Find</button>
                                </div>
                            </div>
                        </div>

                        {/* Registration Form */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm overflow-hidden">
                            <div className="border-base-300 border-b border-dashed">
                                <div className="flex items-center gap-2 p-4">
                                    <div className="grow">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <UserPlusIcon className="size-5 opacity-40" />
                                            Create new account
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body gap-4">
                                <p className="text-xs opacity-60">Registration is free and only takes a minute</p>
                                <div className="flex flex-col gap-1">
                                    <label className="input input-border flex max-w-none items-center gap-2">
                                        <UserSolid className="size-4 opacity-70" />
                                        <input type="text" className="grow" placeholder="Username" />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="input input-border flex max-w-none items-center gap-2">
                                        <KeySolid className="size-4 opacity-70" />
                                        <input type="password" className="grow" placeholder="password" />
                                    </label>
                                    <span className="text-base-content/60 flex items-center gap-2 px-1 text-[0.6875rem]">
                                        <span className="status status-error inline-block"></span>
                                        Password must be 8+ characters
                                    </span>
                                </div>
                                <label className="text-base-content/60 flex items-center gap-2 text-xs">
                                    <input type="checkbox" className="toggle toggle-xs" />
                                    Accept terms without reading
                                </label>
                                <label className="text-base-content/60 flex items-center gap-2 text-xs">
                                    <input type="checkbox" className="toggle toggle-xs" />
                                    Subscribe to spam emails
                                </label>
                                <div className="card-actions items-center gap-6">
                                    <button className="btn btn-primary">Register</button>
                                    <button className="link">Or login</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">

                        {/* Chart */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm">
                            <div className="card-body gap-4">
                                <div className="*:bg-base-content mt-4 flex h-24 items-end gap-2 *:w-full *:rounded-sm">
                                    {[10, 20, 10, 25, 22, 15, 20, 35, 40, 45, 30, 35, 60, 65, 80, 90].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                                <p className="py-3 text-xs">Sales volume reached $12,450 this week, showing a 15% increase from the previous period.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="btn">Charts</button>
                                    <button className="btn btn-neutral">Details</button>
                                </div>
                            </div>
                        </div>

                        {/* Stat - Page Score */}
                        <div className="card bg-base-100 card-border border-base-300 w-full">
                            <div className="stats bg-base-100 w-full overflow-hidden shadow-[0_.1rem_.5rem_-.3rem_#0003]">
                                <div className="stat">
                                    <div className="stat-figure">
                                        <div className="radial-progress" style={{ "--value": 91, "--size": "3rem" } as React.CSSProperties} role="progressbar">91</div>
                                    </div>
                                    <div className="stat-title">Page Score</div>
                                    <div className="stat-value">91<span className="text-sm">/100</span></div>
                                    <div className="stat-desc flex items-center gap-1">
                                        <ShieldCheckSolid className="text-success size-4" />
                                        All good
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm">
                            <div className="card-body gap-4">
                                <h2 className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 font-semibold">
                                        <ArrowTrendingUpIcon className="size-5 opacity-40" />
                                        Recent orders
                                    </span>
                                </h2>
                                <div className="flex flex-col text-xs">
                                    {[
                                        { name: "Charlie Chapman", badge: "badge-info", label: "Send" },
                                        { name: "Howard Hudson", badge: "badge-error", label: "Failed" },
                                        { name: "Fiona Fisher", badge: "badge-warning", label: "In progress" },
                                        { name: "Nick Nelson", badge: "badge-success", label: "Completed" },
                                        { name: "Amanda Anderson", badge: "badge-success", label: "Completed" },
                                    ].map((order) => (
                                        <div key={order.name} className="border-t-base-content/5 flex items-center justify-between gap-2 border-t border-dashed py-2">
                                            {order.name}
                                            <span className={`badge badge-xs ${order.badge}`}>{order.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stat - Revenue */}
                        <div className="card bg-base-100 card-border border-base-300 w-full">
                            <div className="stats">
                                <div className="stat">
                                    <div className="stat-title">{currentMonth} Revenue</div>
                                    <div className="stat-value">$32,400</div>
                                    <div className="stat-desc flex items-center gap-2">
                                        <ArrowTrendingUpIcon className="text-success size-4" />
                                        21% more than last month
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Write Post */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm overflow-hidden">
                            <div className="border-base-300 border-b border-dashed">
                                <div className="flex items-center gap-2 p-4">
                                    <div className="grow">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <PencilIcon className="size-5 opacity-40" />
                                            Write a new post
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="join">
                                        <input className="join-item btn btn-xs px-3 font-bold" type="checkbox" name="options" aria-label="B" />
                                        <input className="join-item btn btn-xs px-3 font-mono italic" type="checkbox" name="options" aria-label="I" />
                                        <input className="join-item btn btn-xs px-3 underline" type="checkbox" name="options" aria-label="U" />
                                    </div>
                                    <button className="btn btn-xs">Add files</button>
                                </div>
                                <textarea className="textarea textarea-border max-w-none resize-none" placeholder="What's happening?"></textarea>
                                <p className="px-2 text-xs opacity-40">1200 characters remaining</p>
                                <div className="card-actions grid grid-cols-2">
                                    <button className="btn">Draft</button>
                                    <button className="btn btn-primary">Publish</button>
                                </div>
                            </div>
                        </div>

                        {/* Chat */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm overflow-hidden">
                            <div className="card-body">
                                <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-8 rounded-full">
                                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/profile/demo/yellingwoman@94.webp" />
                                        </div>
                                    </div>
                                    <div className="chat-header">Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time></div>
                                    <div className="chat-bubble chat-bubble-neutral">It's over Anakin</div>
                                </div>
                                <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-8 rounded-full">
                                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/profile/demo/yellingwoman@94.webp" />
                                        </div>
                                    </div>
                                    <div className="chat-bubble chat-bubble-neutral">I have the high ground</div>
                                    <div className="chat-footer opacity-50">Delivered</div>
                                </div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-8 rounded-full">
                                            <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/profile/demo/yellingcat@94.webp" />
                                        </div>
                                    </div>
                                    <div className="chat-bubble chat-bubble-neutral">You underestimate my power</div>
                                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                                </div>
                            </div>
                            <div className="dock dock-sm bg-base-300 relative px-2">
                                <button><PhoneIcon className="size-5" /></button>
                                <button className="dock-active"><ChatBubbleOvalLeftIcon className="size-5" /></button>
                                <button><Cog6ToothIcon className="size-5" /></button>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="card bg-base-100 card-border border-base-300">
                            <ul className="menu w-full">
                                <li className="menu-title">Admin panel</li>
                                <li><span><CircleStackIcon className="size-5 opacity-30" />Databases<span className="badge justify-self-end">7</span></span></li>
                                <li><span><CubeIcon className="size-5 opacity-30" />Products</span></li>
                                <li><span><EnvelopeIcon className="size-5 opacity-30" />Messages<span className="badge justify-self-end">29</span></span></li>
                                <li><span><KeyIcon className="size-5 opacity-30" />Access tokens</span></li>
                                <li><span><UserIcon className="size-5 opacity-30" />Users<span className="status status-info"></span></span></li>
                                <li><span><AdjustmentsHorizontalIcon className="size-5 opacity-30" />Settings</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4">

                        {/* Music Player */}
                        <div className="card bg-base-100 card-border border-base-300 card-sm overflow-hidden">
                            <div className="card-body my-2">
                                <div className="flex items-center justify-around">
                                    <button className="btn btn-square btn-neutral">
                                        <BackwardIcon className="size-4 shrink-0" />
                                    </button>
                                    <button className="btn btn-square btn-neutral btn-lg">
                                        <PlayIcon className="size-6 shrink-0" />
                                    </button>
                                    <button className="btn btn-square btn-neutral">
                                        <ForwardIcon className="size-4 shrink-0" />
                                    </button>
                                </div>
                                <div className="mt-2 text-center">
                                    <h6 className="text-sm font-bold">PM Zoomcall ASMR</h6>
                                    <p className="text-xs opacity-50">Project Manager talking for 2 hours</p>
                                </div>
                            </div>
                            <div className="border-base-300 flex flex-col border-t px-6 py-4">
                                <div className="relative mt-6">
                                    <div className="tooltip tooltip-open absolute top-2 before:text-xs" style={{ insetInlineStart: "10%" }} data-tip="13:39"></div>
                                    <progress className="progress" value="10" max="100"></progress>
                                </div>
                                <div className="flex justify-between text-xs opacity-50">
                                    <span>13:39</span>
                                    <span>120:00</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-around px-2 pb-6">
                                <button className="btn btn-square"><SpeakerWaveIcon className="size-4" /></button>
                                <button className="btn btn-square"><ArrowPathIcon className="size-4" /></button>
                                <button className="btn btn-square"><ArrowsRightLeftIcon className="size-4" /></button>
                                <button className="btn btn-square"><MusicalNoteIcon className="size-4" /></button>
                            </div>
                        </div>

                        {/* Code mockup */}
                        <div className="mockup-code">
                            <pre className="text-sm" data-prefix="$"><code>npm i daisyui</code></pre>
                            <pre className="text-sm" data-prefix=">"><code>installing...</code></pre>
                            <pre className="text-sm" data-prefix=">"><code>Done!</code></pre>
                        </div>

                        {/* Alerts */}
                        <div className="flex flex-col gap-4">
                            <div className="alert max-sm:alert-vertical alert-info text-xs font-bold">
                                <InboxIcon className="size-6" />
                                There are 9 new messages
                            </div>
                            <div className="alert alert-outline max-sm:alert-vertical alert-success text-xs font-bold">
                                <CheckBadgeIcon className="size-6" />
                                Verification process completed
                            </div>
                            <div className="alert alert-dash max-sm:alert-vertical alert-warning text-xs font-bold">
                                <ShieldExclamationIcon className="size-6" />
                                <span><span className="link">Click</span> to verify your email</span>
                            </div>
                            <div className="alert alert-soft max-sm:alert-vertical alert-error text-xs font-bold">
                                <LockClosedIcon className="size-6" />
                                Access denied
                                <button className="btn btn-xs btn-ghost">Support</button>
                            </div>
                        </div>

                        {/* Timeline */}
                        <ul className="timeline timeline-vertical timeline-compact">
                            {[
                                { title: "Harry Potter and Sorcerer's Stack", done: true },
                                { title: "Harry Potter and Chamber of Servers", done: true },
                                { title: "Harry Potter and Prisoner of Azure", done: true },
                                { title: "Harry Potter and Goblet of Firebase", done: true },
                                { title: "Harry Potter and Elixir of Phoenix", done: false },
                                { title: "Harry Potter and Half-Deployed App", done: false },
                                { title: "Harry Potter and Deathly Frameworks", done: false },
                            ].map((item, i, arr) => (
                                <li key={item.title}>
                                    <div className="timeline-middle">
                                        <CheckCircleSolid className={item.done ? "text-primary size-5" : "size-5"} />
                                    </div>
                                    <div className="timeline-end timeline-box">{item.title}</div>
                                    {i < arr.length - 1 && <hr className={item.done ? "bg-primary" : ""} />}
                                    {i > 0 && <hr className={arr[i - 1].done ? "bg-primary" : ""} style={{ order: -1 }} />}
                                </li>
                            ))}
                        </ul>

                        {/* Pricing */}
                        <div className="card bg-base-100 card-border border-base-300 from-base-content/5 bg-linear-to-bl to-50%">
                            <div className="flex justify-center">
                                <div className="tabs tabs-box bg-base-300 m-4 inline-flex flex-nowrap">
                                    <input type="radio" name="my_tabs_1" role="tab" className="tab w-1/2" aria-label="Monthly" />
                                    <input type="radio" name="my_tabs_1" role="tab" className="tab w-full" aria-label="Yearly" defaultChecked />
                                    <div className="indicator w-1/2">
                                        <div className="indicator-item badge badge-warning badge-xs">SALE</div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body gap-4">
                                <div className="flex flex-col">
                                    <h4 className="font-bold tracking-wide opacity-50">Starter Plan</h4>
                                    <div>
                                        <span className="text-4xl font-black">$200</span><span className="opacity-50">/month</span>
                                    </div>
                                </div>
                                <div className="my-2 flex flex-col text-xs">
                                    {[
                                        { text: "20 Tokens per day", ok: true },
                                        { text: "10 Projects", ok: true },
                                        { text: "API Access", ok: true },
                                        { text: "Priority Support", ok: false },
                                    ].map((item) => (
                                        <div key={item.text} className={`flex items-center gap-2 ${item.ok ? "border-b-accent/5 border-b pb-2" : ""}`}>
                                            {item.ok
                                                ? <CheckCircleSolid className="text-success size-4" />
                                                : <XCircleSolid className="text-error size-4" />
                                            }
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-accent">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
