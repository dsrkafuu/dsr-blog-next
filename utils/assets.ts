import path from 'path';
import fs from 'fs';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { countWords } from '@homegrown/word-counter';
import { endPerf, startPref } from './performance';

const contentPath = path.resolve(process.cwd(), './contents');

export const getNavBarData = async () => {
  startPref('getNavBarData');
  const contentFiles = fs.readdirSync(contentPath);
  const contentFolders = contentFiles
    .map((fileName) => {
      return { fileName, fullPath: path.resolve(contentPath, fileName) };
    })
    .filter(({ fullPath }) => {
      return fs.statSync(fullPath).isDirectory();
    });
  const contentIndexes = contentFolders.map((folder) => {
    const indexFile = path.resolve(folder.fullPath, '_index.md');
    const fileContents = fs.readFileSync(indexFile, 'utf-8');
    const { data } = matter(fileContents);
    return { ...folder, matter: data };
  });
  contentIndexes.sort((a, b) => {
    return a.matter.weight - b.matter.weight;
  });
  const res = contentIndexes.map(({ fileName, matter }) => {
    return {
      title: matter.title,
      link: `/${fileName}`,
    };
  });
  endPerf('getNavBarData');
  return res;
};

export const getPostCount = async () => {
  startPref('getPostCount');
  const allMarkdownFiles = globSync(`${contentPath}/**/*.md`);
  const allMarkdownFilesWithoutIndex = allMarkdownFiles.filter((file) => {
    return !file.includes('_index.md');
  });
  const res = allMarkdownFilesWithoutIndex.length;
  endPerf('getPostCount');
  return res;
};

export const getWordsCount = async () => {
  startPref('getWordsCount');
  const allMarkdownFiles = globSync(`${contentPath}/**/*.md`);
  const allMarkdownFilesWithoutIndex = allMarkdownFiles.filter((file) => {
    return !file.includes('_index.md');
  });
  const allMarkdownFilesWordLength = allMarkdownFilesWithoutIndex.map(
    (file) => {
      try {
        return countWords(fs.readFileSync(file, 'utf-8'));
      } catch {
        return 0;
      }
    }
  );
  const res = allMarkdownFilesWordLength.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  endPerf('getWordsCount');
  return res;
};
