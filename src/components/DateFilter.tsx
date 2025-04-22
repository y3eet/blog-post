"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { appendDateRangeToUrl } from "@/lib/helper";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DateFilter = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<{ startDate: string; endDate: string }>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const appendQuery = () => {
    const url = appendDateRangeToUrl("/blogs", date.startDate, date.endDate);
    router.push(url);
    setOpen(false);
  };

  return (
    <div>
      <button className="btn btn-accent my-2 " onClick={() => setOpen(true)}>
        Filter By Date
      </button>
      <Modal open={open}>
        <h3 className="font-bold text-lg mt-5">Filter Blogs</h3>
        <div className="flex flex-col gap-5 my-5">
          <input
            value={date.startDate}
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
            type="date"
            className="input w-full"
          />
          <input
            value={date.endDate}
            onChange={(e) => setDate({ ...date, endDate: e.target.value })}
            type="date"
            className="input w-full"
          />
        </div>
        <div className="flex justify-between w-full">
          <Link href="/blogs" className="btn btn-accent">
            All
          </Link>
          <div className="flex gap-2">
            <button className="btn btn-soft" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button onClick={appendQuery} className="btn btn-success">
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DateFilter;
