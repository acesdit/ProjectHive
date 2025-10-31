import {Message} from "../model/User";

export interface APIResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>;  
    verificationCode?: string; // For development environment only
    suggestions?: string; // For message suggestions separated by '||'
}