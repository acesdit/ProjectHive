import { auth } from '@/auth'
import StartUpForm from '@/components/StartUpForm'
import { redirect } from 'next/navigation'

const page = async() => {

    const session = await auth
    if (!session) redirect("/");
    return (
        <>
            <section className='blue_container !min-h-[230px]'>
                <h1 className='heading'> Submit Your Startup</h1>                
            </section>
            <StartUpForm />
        </>
    )
}

export default page
