"use client";

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            className="object-contain"
            src={value.imageUrl}
            alt={value.alt || 'Image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      );
    },
    callToAction: ({ value, isInline }: any) => {
      return (
        <Link
          className={`${isInline ? 'inline-flex items-center px-4 py-2 rounded bg-primary text-white' : 'block w-fit px-6 py-3 rounded-md bg-primary text-white font-medium'}`}
          href={value.url}
          target={value.blank ? '_blank' : '_self'}
        >
          {value.text}
        </Link>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link 
          href={value.href}
          rel={rel} 
          className="text-primary hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-6 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 text-lg leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-lg">{children}</li>,
    number: ({ children }: any) => <li className="text-lg">{children}</li>,
  },
};

interface PortableTextProps {
  content: any;
}

export default function SanityPortableText({ content }: PortableTextProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
