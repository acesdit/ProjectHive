import { EyeIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export type StartupTypeCard = Omit<Startup,"author"> & {author?: Author}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function StartUpCard({ post }: { post: StartupTypeCard} ) {

    const { _createdAt, views, author,title, category, _id, image, description } = post

    return (
        <li className="startup-card group ">
            <div className="flex-between">
                <p className='text-16-medium text-gray-500 dark:text-gray-400'>
                    {formatDate(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-blue-600' />
                    <span className='text-16-medium dark:text-white'>{views}</span>
                </div>
            </div>

            <div className='flex-between  mt-5 gap-5'>
                <div className='flex-1 '>
                    <Link href={`/user/${author?._id}`}>
                        <p className='font-mono tracking-tighter '>{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`} className='text-20-semibold mt-1 line-clamp-2 hover:underline'>
                        <h3 className='text-26-semibold line-clamp-1 dark:text-white'>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                        <img
                            src={author?.image}
                            alt="profile"
                            width={50}
                            height={50}
                            className="object-cover w-full h-full" />
                    </div>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc dark:text-white/50'>
                    {description}
                </p>
                <img src={image} alt="placeholder" className='startup-card_img' />
            </Link>

            <div className='flex-between gap-3 mt-5'>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium dark:text-white'>{category}</p>
                </Link>
                <Button className='startup-card_btn ' asChild>
                    <Link className='' href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}
export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartUpCard
