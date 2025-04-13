export const MyEvents = {
    events: {},
    on(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    },
    trigger(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => callback(data));
        }
    },
};

export function handleEvent(eventType, domElement, customEventName) {
     
    domElement[`on${eventType}`] = (event) => {
        const eventData = {
            type: event.type, //
            target: event.target,
            clientX: event.clientX || null,
            clientY: event.clientY || null,
            key: event.key || null, // The key pressed (e.g., "a", "Enter")
            code: event.code || null, // Physical key (e.g., "KeyA", "ArrowUp")
            shiftKey: event.shiftKey || false, // Was Shift key pressed?
            ctrlKey: event.ctrlKey || false, // Was Ctrl key pressed?
            altKey: event.altKey || false, // Was Alt key pressed?
            value: event.target.value || null,
            scrollTop: event.target.scrollTop || null, // Vertical scroll position
            scrollLeft: event.target.scrollLeft || null, // Horizontal scroll position
            scrollHeight: event.target.scrollHeight || null, // Total height of the content
            scrollWidth: event.target.scrollWidth || null, // Total width of the content
        };
        if (event.key === 'Enter' || event.code === 'Enter') {
            MyEvents.trigger('enterKeyPress', eventData); // Trigger a specific event for "Enter"
        }

        MyEvents.trigger(customEventName || eventType, eventData);
    };
}

export function addCustomEventListener(domElement, eventType, callback, customEventName) {
     MyEvents.on(customEventName || eventType, callback);
     handleEvent(eventType, domElement, customEventName);
}