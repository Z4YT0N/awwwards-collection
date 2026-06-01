import Head from 'next/head';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Products from '@/components/Products';
import Footer from '@/components/Footer';

import { styled } from '@/stitches.config';
import type { GetStaticProps, NextPage } from 'next';
import { Product } from '@/product/types';

const Container = styled('div', {
    maxWidth: '',
    margin: '0 auto'
});

const Main = styled('main', {
    color: 'white',
    height: '100%',
    minHeight: '100vh'
});

export const getStaticProps: GetStaticProps = async () => {
    const products = await import('@/product/mock.json').then((m) => m.default);

    return {
        props: { products }
    };
};

const Home: NextPage<{ products: Product[] }> = ({ products }) => {
    return (
        <>
            <Head>
                <title>basement 🏴 challenge</title>
            </Head>
            <Container>
                <Navigation />
                <Main>
                    <Hero />
                    <Marquee />
                    <Products payload={products} />
                    <Footer />
                </Main>
            </Container>
        </>
    );
};

export default Home;
