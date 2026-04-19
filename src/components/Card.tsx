import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  className?: string;
  category?: string;
}

export default function Card({
  title,
  description,
  image,
  url,
  className,
  category,
}: CardProps) {
  const content = (
    <article
      className={cn(
        "card-interactive group relative overflow-hidden rounded-2xl",
        className,
      )}
    >
      {image && (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--bg-card) 0%, transparent 100%)",
            }}
          />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span
            className="inline-block px-3 py-1 mb-4 text-[10px] font-bold
            tracking-widest text-(--accent) uppercase bg-(--accent-subtle)
            border border-(--accent-border) rounded-full"
          >
            {category}
          </span>
        )}
        <h3
          className="text-base font-bold text-(--fg) mb-2
          group-hover:text-(--accent) transition-colors leading-snug"
        >
          {title}
        </h3>
        <p className="text-(--fg-2) text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>

        {url && (
          <div
            className="mt-5 flex items-center gap-1 text-xs font-semibold
            text-(--fg-3) group-hover:text-(--accent) transition-colors"
          >
            En savoir plus
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </div>
        )}
      </div>
    </article>
  );

  if (url) {
    return (
      <Link href={url} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

