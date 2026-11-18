'use client';

import dynamic from 'next/dynamic';
import '@scalar/api-reference-react/style.css';

const ApiReferenceReact = dynamic(
  () => import('@scalar/api-reference-react').then((mod) => mod.ApiReferenceReact),
  { ssr: false },
);

export function ApiPlayground() {
  return (
    <div className="not-prose">
      <ApiReferenceReact
        configuration={{
          url: '/api/openapi',
          baseServerURL: 'https://api.rynni.cc',
          withDefaultFonts: false,
        }}
      />
    </div>
  );
}
