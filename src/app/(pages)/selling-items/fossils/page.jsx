"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/section-title";
import SellingItemsTabs from "@/components/Sellable-Items/tabs";
import FossilsTab from "@/components/Sellable-Items/Fossils/fossils-tab";
import Search from "@/components/Sellable-Items/search";

export default function Page() {

  const [selection, setSelection] = useState("fossils");
  const [search, setSearch] = useState("");

  return (
    <section className="mt-3 md:mt-6 mb-8 md:mb-10 mx-2 md:mx-10 lg:mx-20">
      <SectionTitle>Sellable Items</SectionTitle>
      <SellingItemsTabs selection={selection} setSelection={setSelection} />
      <div className="mt-2 p-2 md:p-8 shadow border text-gray-700 rounded overflow-x-auto">
        <Search itemName="fossil" setSearch={setSearch} />
        <FossilsTab search={search} />
      </div>
    </section>
  )
}
