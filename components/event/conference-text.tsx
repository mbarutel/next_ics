// "use client";
//
// import React from "react";
// import { RichText } from "..";
// import { EventType } from "@/lib/types";
// import { useSectionInView } from "@/lib/hooks";
//
// export default function ConferenceText(
//   { event }: { event: EventType },
// ) {
//   const { ref } = useSectionInView("Event", 0.2);
//
//   return (
//     <section ref={ref} id="event" className="scroll-mt-[800px]">
//       <div>
//         <RichText document={event.content} />
//       </div>
//     </section>
//   );
// }
