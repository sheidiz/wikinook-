"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { months, getEvents } from "../../../../lib/data";
import SectionTitle from "@/components/section-title";
import FilterMonth from "./(components)/filter-month";
import FilterHemisphere from "./(components)/filter-hemisphere";
import Events from "./(components)/events";

export default function Page() {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ month: "-1", hemisphere: "(Northern Hemisphere)" });

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const events = await getEvents(filters.hemisphere)
        setData(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };
    getData();
  }, [filters]);

  return (
    <div className="mt-3 mb-5 md:my-6 mx-2 md:mx-10 lg:mx-20">
      <SectionTitle>Events</SectionTitle>
      <div className="mb-5 flex justify-center md:justify-start gap-2">
        <FilterMonth filters={filters} setFilters={setFilters} />
        <FilterHemisphere filters={filters} setFilters={setFilters} />
      </div>

      {filters.month >= 0 && (
        <div>
          <h2 className="mb-3 text-gray-400 text-2xl font-semibold">{months[filters.month].month}</h2>
          <motion.div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            key={filters.month + filters.hemisphere}
            variants={container}
            initial="hidden"
            animate="visible">
            <Events events={data[filters.month]} />
          </motion.div>
        </div>)
      }
    </div>
  )
}
