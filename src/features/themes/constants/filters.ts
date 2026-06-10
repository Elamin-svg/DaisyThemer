export const COLORS = [{
    name: "Red",
    class: "bg-red-500"
}, {
    name: "Blue",
    class: "bg-blue-500"
}, {
    name: "Green",
    class: "bg-green-500"
}, {
    name: "Yellow",
    class: "bg-yellow-500"
}, {
    name: "Pink",
    class: "bg-pink-500"
}, {
    name: "Purple",
    class: "bg-purple-500"
}, {
    name: "Orange",
    class: "bg-orange-500"
}, {
    name: "Teal",
    class: "bg-teal-500"
}, {
    name: "Gray",
    class: "bg-gray-500"
}, {
    name: "Black",
    class: "bg-black"
}, {
    name: "White",
    class: "bg-white"
}] as const;

export type ThemeColorBucket = typeof COLORS[number]['name'];