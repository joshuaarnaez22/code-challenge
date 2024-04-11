import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TablePage from "./_components/books-table/table-page";
export default function Home() {
  return (
    <main className="flex  pt-10">
      <Tabs defaultValue="first" className="w-full flex flex-col items-center">
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
          <TabsTrigger value="third">Third</TabsTrigger>
        </TabsList>
        <div className="w-full p-10 mx-auto">
          <TabsContent value="first">
            <TablePage />
          </TabsContent>
          <TabsContent value="second">
            <h3>Second tab</h3>
          </TabsContent>
          <TabsContent value="third">
            <h3>Third tab</h3>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
