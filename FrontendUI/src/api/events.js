import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql'; // Update with your actual endpoint


export const fetchEvents = async (payload) => {
    console.log("payload", payload);

    try {
        const { page, limit, sort, order, search, filters, userId } = payload; // Destructure payload

        const response = await axios.post(API_URL, {
            query: `
                query ListEvents($page: Int, $limit: Int, $sort: String, $order: String, $search: String, $filters: FilterInput, $userId: Int) {
                    listEvents(page: $page, limit: $limit, sort: $sort, order: $order, search: $search, filters: $filters, userId: $userId) {
                        events {
                            id
                            name
                            description
                            images
                            startDate
                            endDate
                            totalGuests
                            userId
                        }
                        totalCount
                    }
                }
            `,
            variables: {
                page,
                limit,
                sort,
                order,
                search,
                filters,
                userId:Number(userId), // Include user ID in the variables
            },
        },
    );

        console.log("Response:", response.data);
        return response.data.data.listEvents;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events.");
    }
};


export const loginAsGuest = async () => {
    try {
        const response = await axios.post(API_URL, {
            query: `
                mutation LoginAsGuest {
                    loginAsGuest {
                        message
                        user {
                            id
                            username
                        }
                    }
                }
            `,
        });
        
        return response.data.data.loginAsGuest; // Return the response from the mutation
    } catch (error) {
        console.error("Error logging in as guest:", error);
        throw new Error("Failed to log in as guest.");
    }
};
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, {
            query: `
               mutation CreateEvent($name: String!, $description: String!, $images: [String!]!, $startDate: String!, $endDate: String!, $totalGuests: Int!, $userId: Int!) {
  createEvent(name: $name, description: $description, images: $images, startDate: $startDate, endDate: $endDate, totalGuests: $totalGuests, userId: $userId) {
    id
    name
    description
    images
    startDate
    endDate
    totalGuests
    userId
  }
}
            `,
            variables: {
                name: eventData.name,
                description: eventData.description,
                images: eventData.images,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                totalGuests: eventData.totalGuests,
                userId:Number(eventData.userId)
            },
        });
        return response.data.data.createEvent;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Failed to create event.");
    }
};

export const updateEvent = async (eventData) => {
    console.log("hvhhhhv",eventData);
    
    try {
        const response = await axios.post(API_URL, {
            query: `
               mutation UpdateEvent($updateEventId: ID!, $images: [String!]!, $userId: Int!, $name: String, $description: String, $startDate: String, $endDate: String, $totalGuests: Int) {
  updateEvent(id: $updateEventId, images: $images, userId: $userId, name: $name, description: $description, startDate: $startDate, endDate: $endDate, totalGuests: $totalGuests) {
    id
    name
    description
    images
    startDate
    endDate
    totalGuests
    userId
  }
}
            `,
            variables: {
                updateEventId: eventData.id, // Use consistent variable naming
                name: eventData.name,
                description: eventData.description,
                images: eventData.images,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                totalGuests: eventData.totalGuests,
                userId:Number(eventData.userId)
            },
        });
        return response.data.data.updateEvent;
    } catch (error) {
        console.error("Error updating event:", error);
        throw new Error("Failed to update event.");
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.post(API_URL, {
            query: `
                mutation DeleteEvent($id: ID!) {
                    deleteEvent(id: $id)
                }
            `,
            variables: {
                id: eventId, // Use consistent variable naming
            },
        });
        return response.data.data.deleteEvent;
    } catch (error) {
        console.error("Error deleting event:", error);
        throw new Error("Failed to delete event.");
    }
};
