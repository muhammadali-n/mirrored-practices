
import React from 'react'
import BannerCarousalLayout from '../layout/BannerCarousalLayout'
import { Section } from '@/components/Section'

export default function BannerCarousal({ response }: { response :any}) {
  return (
      <Section>
      <BannerCarousalLayout
        response={response}
      />
      </Section>
  )
}
