import React from 'react'
import Ping from './Ping'
import { STARTUPS_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import {after } from 'next/server';

const View = async ({ id }: { id: string }) => {
    const result = await client.withConfig({ useCdn: false }).fetch(STARTUPS_VIEWS_QUERY, { id });
    const totalView = result?.views || 0;

    // Dynamically rendering data - 
    after(async()=>await writeClient
        .patch(id)
        .set({ views: totalView + 1 })
        .commit()
    )

    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'><Ping /></div>
            <p className='view-text'>
                <span className='font-black dark:text-white'>Views: {totalView}</span>
            </p>
        </div>
    )
}

export default View
