export function getStudioNav(studio: string | undefined, studioData: any) {
  const hasWorkshops = Boolean(studioData?.workshops?.docs[0]?.id)

  const defaultNav = [
    {
      id: 'schedule',
      text: 'Schedule',
      type: 'internal',
      page: {
        slug: `studios/${studio}`,
      },
    },
    ...(hasWorkshops ? [{
      id: 'workshops',
      text: 'Workshops',
      type: 'internal',
      page: {
        slug: `studios/${studio}/workshops`,
      },
    }] : []),
    {
      id: 'teaching-team',
      text: 'Teaching Team',
      type: 'internal',
      page: {
        slug: `studios/${studio}/teaching-team`,
      },
    }
  ]

  return [...defaultNav, ...studioData.studioNav]
}