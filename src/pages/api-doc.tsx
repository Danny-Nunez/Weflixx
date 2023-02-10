import Meta from "components/Meta";
import { server } from "configs/server";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{ spec: Record<string, any> }>(
  // @ts-ignore
  import("swagger-ui-react"),
  { ssr: false }
);

const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);
  return (
    <>
      <Meta title="NetFilm Api" description="A api NetFilm from LokLok app" />
      <SwaggerUI spec={spec} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "src/pages/api",
    definition: {
      openapi: "3.0.0",
      servers: [{ url: `${server}/api` }, { url: `${process.env.NEXT_PUBLIC_LOCALHOST}/api` }],
      info: {
        title: "NetFilm Api",
        version: "1.0.0",
        description: "A api NetFilm from LokLok app"
      }
    }
  });
  return {
    props: { spec }
  };
};

export default ApiDoc;
