import { Genre, User } from '@prisma/client';
import { Request } from 'express';

    declare global {namespace Express {
        export interface Request {
            user: User;
            // upload_urls: { [fieldname: string]: string };
            genre: Genre;
            upload_urls: {
                Single_file?: string;
                gallery?: string[]; 
                
                // Ensure it's an array of strings
              };

        }
    }}
    

