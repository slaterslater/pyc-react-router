import dayjs from "dayjs";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { PageLayout } from "~/components/PageLayout";
import SEO from "~/components/SEO";
import { ALL_BLOGS_QUERY } from "~/graphql/queries/allBlogsQuery";
import { getSite } from "~/lib/getSite.server";
import { payload } from "~/lib/payloadClient.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const site = getSite(request);
  const payloadData = await payload.request(ALL_BLOGS_QUERY, { siteId: site.id })
  return {
    blogs: payloadData.Blogs?.docs,
    name: site.name
  }
}

export default function AllBlogs() {
  const { blogs, name } = useLoaderData<typeof loader>()

  return (
    <PageLayout>
      <SEO title="Blog" />
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-4 bg-charcoal text-white w-full h-[390px] md:h-[500px] rounded-md text-center">
          <h1 className="heading text-white uppercase">Power Yoga {name} blog</h1>
          {/* <p>For general questions about PYC please email us at <a className="underline" href="mailto:info@poweryogacanada.com">info@poweryogacanada.com</a></p> */}
        </div>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {blogs?.map((blog: any) => <Blog key={blog.id} blog={blog} />)}
      </section>
    </PageLayout>
  )
}

function Blog({ blog }: { blog: any }) {
  return (
    <Link to={`/blogs/${blog.slug}`} className="flex flex-col p-4 pb-8 bg-cream rounded-md">
      <img src={blog.banner.media.thumbnailURL} alt={blog.title} className="w-full h-full object-cover rounded-md" />
      <h2 className="text-lg uppercase font-semibold mt-2">{blog.title}</h2>
      <p>{dayjs(blog.date).format('MMMM D, YYYY')}</p>
    </Link>
  )
}