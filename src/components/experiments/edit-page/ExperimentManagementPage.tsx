import { useRoute } from 'wouter';
import NotFound from '../../NotFound';
import { Box, Flex, Heading, HStack, Stack, Tabs } from '@chakra-ui/react';
import { Experiment } from '@avocet/core';
import {
  StartExperimentButton,
  PauseExperimentButton,
  CompleteExperimentButton,
} from './ExperimentControlButton';
import ErrorBox from '#/components/helpers/ErrorBox';
import Loader from '#/components/helpers/Loader';
import { Tooltip } from '#/components/ui/tooltip';
import { Status } from '#/components/ui/status';
import { EXP_STATUS_LEGEND } from '#/lib/constants';
import ExperimentControlMenu from './ExperimentControlMenu';
import { useState } from 'react';
import ExperimentAnalysisSection from './ExperimentAnalysisSection';
import { ExperimentProvider, useExperimentHook } from './ExperimentContext';
import { ExperimentOverview } from './ExperimentOverview';

const tabNames = ['Overview', 'Analysis'] as const;
type TabName = (typeof tabNames)[number];
const isValidTab = (tabName: unknown): tabName is TabName =>
  tabNames.includes(tabName as any);

const ExperimentTabContent = ({
  tabName,
  children,
}: React.PropsWithChildren<{ tabName: TabName }>) => (
  <Tabs.Content
    border="1px solid"
    borderColor="gray.200"
    value={tabName}
    background="whitesmoke"
    padding="15px"
  >
    {children}
  </Tabs.Content>
);

export default function ExperimentManagementPage() {
  const [_match, params] = useRoute('/experiments/:id');
  const [selectedTab, setSelectedTab] = useState<TabName>(tabNames[0]);

  if (params === null) {
    throw new Error(`No params passed!`);
  }

  if (typeof params.id !== 'string') {
    throw new Error(`id "${params?.id}" is not a string!`);
  }

  const { isPending, isError, error, data } = useExperimentHook(params.id);

  if (isPending) return <Loader label="Loading experiment..." />;
  if (isError) return <ErrorBox error={error} />;
  if (data === null) {
    return <NotFound componentName="Experiment" />;
  }

  return (
    <ExperimentProvider experimentId={params.id}>
      <Box>
        <Stack gap={4} padding="25px" height="100vh" overflowY="scroll">
          <ExperimentTitleBar experiment={data} />
          <Tabs.Root
            value={selectedTab}
            margin="15px 0 0 0"
            variant="outline"
            onValueChange={(e) =>
              isValidTab(e.value) && setSelectedTab(e.value)
            }
          >
            <Tabs.List>
              {tabNames.map((tabName) => (
                <Tabs.Trigger
                  border="1px solid"
                  borderColor="gray.200"
                  value={tabName}
                  key={tabName}
                >
                  {tabName}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.ContentGroup>
              <ExperimentTabContent tabName={'Overview'}>
                <ExperimentOverview />
              </ExperimentTabContent>
              <ExperimentTabContent tabName={'Analysis'}>
                <ExperimentAnalysisSection />
              </ExperimentTabContent>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Stack>
      </Box>
    </ExperimentProvider>
  );
}

const ExperimentTitleBar = ({ experiment }: { experiment: Experiment }) => {
  return (
    <Flex justifyContent="space-between">
      <Heading size="3xl">{experiment.name}</Heading>
      <HStack>
        <Tooltip
          showArrow
          openDelay={50}
          content={EXP_STATUS_LEGEND[experiment.status].description}
        >
          <Status colorPalette={EXP_STATUS_LEGEND[experiment.status].color}>
            {experiment.status}
          </Status>
        </Tooltip>
        {
          // TODO: show "Resume" label instead of "Start" for paused experiments
          (experiment.status === 'draft' || experiment.status === 'paused') && (
            <StartExperimentButton experiment={experiment} />
          )
        }
        {experiment.status === 'active' && (
          <>
            <PauseExperimentButton experiment={experiment} />
            <CompleteExperimentButton experiment={experiment} />
          </>
        )}
        <ExperimentControlMenu
          experimentId={experiment.id}
          disabled={['active', 'paused'].includes(experiment.status)}
        />
      </HStack>
    </Flex>
  );
};
