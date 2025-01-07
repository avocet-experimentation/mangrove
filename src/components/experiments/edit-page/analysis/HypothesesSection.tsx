import PageSection from '#/components/helpers/PageSection';
import { HStack, Heading } from '@chakra-ui/react';
import { useExperimentContext } from '../ExperimentContext';
import { PageToolTip } from '#/components/helpers/PageToolTip';
import { HypothesisList } from './HypothesisList';
import { HypothesisCreationForm } from './HypothesisCreationForm';

/**
 * (WIP) Allow users to manage hypotheses
 *
 * todo:
 * - make form a modal
 * - make hypothesis list items manageable
 */
export default function HypothesesSection() {
  const { experiment } = useExperimentContext();

  return (
    <PageSection>
      <HStack gap="2.5">
        <Heading size="lg">Hypotheses</Heading>
        <PageToolTip
          content={
            'At least one hypothesis must be defined before the experiment can be started.'
          }
        />
      </HStack>
      <HypothesisList />
      <HypothesisCreationForm />
    </PageSection>
  );
}
