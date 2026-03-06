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
        "group relative overflow-hidden bg-[#161616] border border-[#2a2a2a] rounded-2xl transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-1",
        className,
      )}
    >
      {image && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#161616] via-[#161616]/30 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 rounded-full">
            {category}
          </span>
        )}
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>

        {url && (
          <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-amber-400 transition-colors">
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
