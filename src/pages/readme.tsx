import type { GetStaticProps, NextPage } from 'next';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

import Readme from 'src/containers/readme/Readme';
import getRootPath from 'src/helpers/getRootPath';

const ReadmePage: NextPage<{ source: any }> = (props) => <Readme source={props.source} />;

export const getStaticProps: GetStaticProps = async (context) => {
  const localeUsed = context.locale !== 'en' ? `-${context.locale}` : '';
  const docPath = getRootPath(`README${localeUsed}.mdx`);
  const source = fs.readFileSync(docPath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export default ReadmePage;
