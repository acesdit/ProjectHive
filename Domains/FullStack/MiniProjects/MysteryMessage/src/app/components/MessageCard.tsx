"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"
import { Message } from "@/model/User"
import { Trash2 } from 'lucide-react'
import axios from "axios"
import { APIResponse } from "@/types/APIResponse"
import { toast } from "sonner"

type MessageCardProps = {
    message: Message, 
    onMessageDelete: (messageId: string) => void 
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
    // Format date to display in a user-friendly way
    const formatDate = (dateString: string | Date) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return 'Unknown date';
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<APIResponse>(`/api/delete-message/${message._id}`);
            toast.success(response.data.message || 'Message deleted successfully');
            onMessageDelete(message._id as string);
        } catch (error) {
            toast.error('Failed to delete message');
            console.error('Error deleting message:', error);
        }
    };
    
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">Anonymous Message</CardTitle>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This message will be permanently removed.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <CardDescription>{formatDate(message.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="whitespace-pre-line">{message.content}</p>
            </CardContent>
        </Card>
    )
}

export default MessageCard
