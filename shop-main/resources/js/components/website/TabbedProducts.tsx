import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import ProductCard from '@/components/website/ProductCard';

type Product = Record<string, any>;

export default function TabbedProducts({
    featured = [],
    bestSelling = [],
    newArrivals = [],
}: { featured?: Product[]; bestSelling?: Product[]; newArrivals?: Product[] }) {
    return (
        <section>
            <div className="mb-5 flex items-end justify-between">
                <h2 className="text-2xl font-semibold sm:text-3xl">Explore</h2>
                <div className="ml-6 h-px flex-1 bg-gradient-to-r from-indigo-500/60 via-violet-500/60 to-fuchsia-500/60" />
            </div>
            <Tabs defaultValue="featured" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="best">Best Selling</TabsTrigger>
                    <TabsTrigger value="new">New Arrivals</TabsTrigger>
                </TabsList>
                <TabsContent value="featured" className="mt-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {featured.map((p: any, idx: number) => (
                            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: idx * 0.04 }}>
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="best" className="mt-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {bestSelling.map((p: any, idx: number) => (
                            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: idx * 0.04 }}>
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="new" className="mt-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {newArrivals.map((p: any, idx: number) => (
                            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: idx * 0.04 }}>
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}


