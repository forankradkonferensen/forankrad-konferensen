import { IHandleBookingIntegration } from "@/app/interfaces/IHandleBookingIntegration";
import { Booking } from "@/app/models/Booking";

export class NotionHandleBooking implements IHandleBookingIntegration {
    
    private NotionSecret = process.env.NOTION_SECRET;
    private NotionBookingDataSource = process.env.NOTION_BOKINGS_DATA_SOURCE;

    CreateBooking = async (booking: Booking) => {
            const url = "https://api.notion.com/v1/pages"
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.NotionSecret}`,
                        "Notion-Version": "2025-09-03",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        parent: { database_id: "28ab85c09f3e80e68d0cf7cbddc8978a" },
                        properties: {
                            BookingNumber: { title: [{ text: { content: booking.id } }]},
                            FirstName: {rich_text: [{ text: { content: booking.firstName } }]},
                            LastName: { rich_text: [{ text: { content: booking.lastName } }]},
                            PersonalNumber: { rich_text: [{ text: { content: booking.personalNumber } }]},
                            Adress: { rich_text: [{ text: { content: booking.address } }]},
                            PostCode: { rich_text: [{ text: { content: booking.postCode } }]},
                            City: { rich_text: [{ text: { content: booking.city } }]},
                            Email: { email: booking.email},
                            Phone: { phone_number: booking.phoneNumber},
                            Church: { rich_text: [{ text: { content: booking.church } }]},
                            Message: { rich_text: [{ text: { content: booking.message } }]},
                            HasPayed: { checkbox: booking.hasPaid }
                        }
                    })       
                })
                if(!res.ok) {
                    return false
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }

    CountBookings = async (cursor: string | null = null, numberOfPages = 0): Promise<number> => {
        const url = `https://api.notion.com/v1/data_sources/${this.NotionBookingDataSource}/query`
        const body = cursor ? JSON.stringify({start_cursor: cursor}) : JSON.stringify({})
        try {
            const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.NotionSecret}`,
                "Content-Type": "application/json",
                "Notion-Version": "2025-09-03"
            },
            body
            })
        if(!res.ok) return -1
        const data = await res.json()
        if(data.has_more) {
            return this.CountBookings(data.next_cursor, numberOfPages+1)
        }
        const count = numberOfPages * 100 + data.results.length
        return count;
        } catch(error) {
            return -1;
        }
    };

    BookingExist = async (property: string, value: string): Promise<boolean> => {
        const url = `https://api.notion.com/v1/data_sources/${this.NotionBookingDataSource}/query`
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.NotionSecret}`,
                    "Content-Type": "application/json",
                    "Notion-Version": "2025-09-03"
                },
                body: JSON.stringify({
                    filter: {
                    property: property, 
                    rich_text: {
                        equals: value
                    }
                    }
                })
                });
                const body = await res.json()
                return body.results.length !== 0; 
            } catch {
                return false
            }
        }  
    }