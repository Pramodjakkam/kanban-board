import Head from 'next/head';
import Board from './Board'; // Make sure this path is correct

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kanban Board</title>
      </Head>
      <main className="container mx-auto p-4">
        <Board />
      </main>
    </div>
  );
}
