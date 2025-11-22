import { readFile } from "fs/promises";
import { join } from "path";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

const validSlugs = ["fairway-practice", "fairway-booking", "mindful-moment"];

async function getPRDContent(slug: string): Promise<string | null> {
  if (!validSlugs.includes(slug)) {
    return null;
  }

  try {
    const filePath = join(process.cwd(), "src", "data", "prds", `${slug}.md`);
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading PRD for ${slug}:`, error);
    return null;
  }
}

export default async function PRDPage({ params }: { params: { slug: string } }) {
  const content = await getPRDContent(params.slug);

  if (!content) {
    notFound();
  }

  const projectTitles: Record<string, string> = {
    "fairway-practice": "Fairway Practice",
    "fairway-booking": "Fairway Booking",
    "mindful-moment": "Mindful Moment"
  };

  const title = projectTitles[params.slug] || "Product Overview";

  return (
    <>
      <main className="min-h-screen">
        <PrimaryNav />
        <article className="mx-auto max-w-4xl px-5 py-12">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-textSecondary hover:text-white transition-colors inline-flex items-center gap-2 mb-6"
            >
              ← Back to Projects
            </Link>
            <h1 className="font-display text-4xl font-bold mb-2">{title}</h1>
            <p className="text-textSecondary">Product Overview for Investors</p>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="rounded-3xl border border-white/10 bg-abyss/40 p-8 md:p-12">
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                  h1: ({ children }) => (
                    <h1 className="font-display text-3xl font-bold mb-6 text-white">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-display text-2xl font-semibold mb-4 mt-8 text-white">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display text-xl font-semibold mb-3 mt-6 text-white">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-textSecondary mb-4 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-textSecondary">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-textSecondary">{children}</em>
                  ),
                  hr: () => (
                    <hr className="my-8 border-white/10" />
                  )
                }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

