"use client";
import { getMe } from '@/api/endpoints/user';
import { Loader } from '@/components/Loader';
import { authLinks } from '@/libs/links';
import { redirect } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'

function layout({ children }: { children: ReactNode }) {
  const [next, setNext] = useState(false);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const myInfo = (await getMe()).data.data.me;
      if (myInfo) {
        if (!myInfo.firstName || !myInfo.lastName) {
          redirect("/onboarding");
        } else {
          setNext(true);
        }
      } else {
        redirect(authLinks.login);
      }
    }

    fetchMyInfo();
  }, []);

  return next ? (
    children
  ) : (
    <Loader variant="fullscreen" />
  )
}

export default layout