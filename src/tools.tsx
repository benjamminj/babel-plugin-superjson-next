import SuperJSON from 'superjson';
import type { GetServerSideProps } from 'next';
import * as React from 'react';

type SuperJSONResult = any;

export function withSuperJSONProps<P>(
  gssp: GetServerSideProps<P>
): GetServerSideProps<SuperJSONResult> {
  return async function withSuperJSON(...args) {
    const result = await gssp(...args);
    return {
      ...result,
      props: SuperJSON.serialize(result.props as any),
    };
  };
}

export function withSuperJSONPage<P>(
  Page: React.ComponentType<P>
): React.ComponentType<SuperJSONResult> {
  return function WithSuperJSON(serializedProps: any) {
    const props = (SuperJSON.deserialize(serializedProps) as unknown) as P;
    return <Page {...props} />;
  };
}
