// return tailwind class for each task status
export const getStatusStyle = (status: string) => {
    switch (status) {
        case "In Progress":
            return { bg: "bg-orange", text: 'text-dark' };
        case "Approved":
            return { bg: "bg-green", text: 'text-dark' };
        case "Reject":
            return { bg: "bg-red", text: 'text-white' };
        default:
            return { bg: "bg-neutral-6", text: 'text-dark' };
    }
};

// return tailwind class for each task category
export const getCategoryStyle = (category: string) => {
    switch (category) {
        case "Research":
            return { bg: "bg-orange", text: 'text-dark' };
        case "Development":
            return { bg: "bg-green", text: 'text-dark' };
        case "UX Reserch":
            return { bg: "bg-red", text: 'text-white' };
        case "Feedback":
            return { bg: "bg-blue", text: 'text-white' };
        default:
            return { bg: "bg-neutral-6", text: 'text-dark' };
    }
};

