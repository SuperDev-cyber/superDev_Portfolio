
export function calculatePosition(element: HTMLDivElement) {

    const rect = element.getBoundingClientRect();

    return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        height: rect.height,
        width: rect.width,
    };
}