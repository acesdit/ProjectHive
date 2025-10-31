import SearchForm from "../../components/SearchForm";
import StartUpCard from "../../components/StartUpCard";
import { STARTUPS_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = {search:query || null};
  
  // Use the original approach but wrap in try/catch for error handling
  let posts: any[] = [];
  try {
    const response = await sanityFetch({query:STARTUPS_QUERIES,params});
    posts = response?.data || [];
  } catch (error) {
    console.error("Error fetching startups:", error);
    // Continue with empty posts array if there's an error
  }

  const session = await auth();
  // console.log(session?.id);

  return (
    <>
      <section className="blue_container min-h-screen">
        <h1 className="heading">pitch your startup <br />connect with enthrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Join our community to share your vision and collaborate on innovative projects.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="selection_container dark:bg-black">
        <p className="text-center text-3xl font-semibold dark:text-white">
          {query ? `Search results for "${query}"` : "Explore Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartUpCard key={post._id} post={post} />
            ))
          ) : (<p className="no-results text-white light:dark-black" >No StartUp Found </p>)
          }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
