import { Axios, baseURL } from "@/lib/api/Axios";
import PaginationApp from "@/components/global/pagination";
import FaqForm from "@/components/faqs/faqForm";
import EmptyData from "@/components/global/empty";
import AccordionPanelApp from "@/components/faqs/AccordionPanelApp";
import SubHeader from "@/components/global/sub-header";

export default async function FaqPage({ searchParams }) {
  const { page, limit } = searchParams;
  
  
  let section;
  try {
    section = await Axios.get(`/pages/faqs/sections`);
  } catch (error) {
    console.error("Error fetching faqs data:", error);
  }
  
  let data;
  try {
    data = await Axios.get(
      `/faq/answer?page=${page || 1}&limit=${limit || 10}`
    );
  } catch (error) {
    console.error("Error fetching faqs data:", error);
  }
  
  section = section?.data?.data?.sections[0];
  


  const totalPages = data?.data?.totalPages;
  const faqs  = data?.data?.data?.faqs;

  return (
    <div>
      {section && section?.title && (
          <SubHeader
            title={section?.title}
            desc={section?.content}
            img={baseURL + section?.images[0]?.url}
          />
        )}
      <section className="container-app w-full grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="w-full space-y-10 md:col-span-3">
          <section className="flex flex-col justify-center items-start space-y-4 bg-gray-100 p-4">
            <h3 className="flex items-center text-sm font-bold text-primary">
              <span className="w-10 h-0.5 inline-block bg-primary-500 me-2"></span>
              ANY QUESTIONS
            </h3>
            <h1 className="text-xl md:text-4xl font-bold">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-gray-800 text-sm">
              Mollit voluptatem perspiciatis convallis elementum corporis quo
              veritatis aliquid blandit, blandit torquent, odit placeat.
              Adipiscing repudiandae eius cursus? Nostrum magnis maxime curae
              placeat.
            </p>
          </section>
          { faqs &&
            faqs?.length === 0 ? (
              <EmptyData text="Faq is empty" /> 
            ) : 
              <>
              <section>
                {faqs && <AccordionPanelApp faqs={faqs} />}
              </section>
              <div className="flex justify-center">
                <PaginationApp
                  page={parseInt(page || 1)}
                  totalPages={totalPages}
                  limit={limit || 10}
                  url="/faqs"
                />
           </div>
              </>
          }
        </div>
        <div className="w-full h-auto md:col-span-2">
          <div className="p-8 bg-secondary-500 text-white text-center space-y-5">
            <h1 className="text-xl font-semibold">STILL HAVE A QUESTION?</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              magni ad aspernatur illo doloremque molestiae iste recusandae nam
              libero quaerat!
            </p>

            <FaqForm />
          </div>
        </div>
      </section>
      {/* <section className="container-app w-full grid grid-cols-1 md:grid-cols-5 gap-10 my-20">
        <div className="w-full h-auto md:col-span-2">
          <div className="relative md:h-[30rem] text-white">
            <img src="/images/img27.jpg" className="h-full w-full" alt="" />
            <div className="bg-primary-500 md:w-11/12 p-4 md:absolute -bottom-10 left-0">
              <i className="text-5xl fas fa-quote-left"></i>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                leo."
              </p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-10 md:col-span-3 mt-10 md:mt-0">
          <section className="flex flex-col justify-center items-start space-y-4 bg-gray-100 p-4">
            <h3 className="flex items-center text-sm font-bold text-primary">
              <span className="w-10 h-0.5 inline-block bg-primary-500 me-2"></span>
              QUESTIONS/ANSWERS
            </h3>
            <h1 className="text-xl md:text-4xl font-bold">
              BENEFITS & WHAT WE DO?
            </h1>
          </section>
          <section>
            {faqs &&
              faqs.map((faq) => (
                <AccordionPanelApp key={faq._id} faq={faq}/>
            ))}
            </Accordion>
          </section>
        </div>
      </section> */}
    </div>
  );
}
