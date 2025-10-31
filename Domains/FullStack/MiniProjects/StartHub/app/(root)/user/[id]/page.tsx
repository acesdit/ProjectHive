import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartUpCard";
import { Metadata, ResolvingMetadata } from 'next';

export const experimental_ppr = true;

import { createMetadata } from "@/lib/metadata";

// Generate dynamic metadata for each user profile page
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch user data
  const id = params.id;
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  
  // If no user is found, return default metadata
  if (!user) {
    return createMetadata({
      title: 'User Not Found',
      description: 'The user profile you are looking for could not be found.'
    });
  }
    const userName = user.name || 'StartHub User';
  
  return createMetadata({
    title: userName,
    description: user.bio || `${userName}'s profile on StartHub - Connect with innovators and entrepreneurs`,
    imageUrl: user.image || '/logo.svg',
    keywords: ['profile', 'entrepreneur', 'founder', 'innovator'],
    authorName: user.username || userName,
    canonicalPath: `/user/${id}`
  });
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image || '/placeholder-user.png'}
            alt={user.name || 'User profile'}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold dark:text-white">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;