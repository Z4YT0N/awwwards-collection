import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import useForceRerender from '../../hooks/useForceRerender';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { profileCard } from '../../constants/code/Components/profileCardCode';
import ProfileCard from '../../content/Components/ProfileCard/ProfileCard';

const DEFAULT_PROPS = {
  showIcon: true,
  showUserInfo: false,
  enableMobileTilt: false,
  showBehindGlow: true,
  behindGlowColor: 'rgba(125, 190, 255, 0.67)',
  customInnerGradient: 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)'
};

const ProfileCardDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { showIcon, showUserInfo, enableMobileTilt, showBehindGlow, behindGlowColor, customInnerGradient } = props;

  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'avatarUrl',
        type: 'string',
        default: '"<Placeholder for avatar URL>"',
        description: 'URL for the main avatar image displayed on the card'
      },
      {
        name: 'iconUrl',
        type: 'string',
        default: '"<Placeholder for icon URL>"',
        description: 'Optional URL for an icon pattern overlay on the card background'
      },
      {
        name: 'grainUrl',
        type: 'string',
        default: '"<Placeholder for grain URL>"',
        description: 'Optional URL for a grain texture overlay effect'
      },
      {
        name: 'innerGradient',
        type: 'string',
        default: 'undefined',
        description: 'Custom CSS gradient string for the inner card gradient'
      },
      {
        name: 'behindGlowEnabled',
        type: 'boolean',
        default: 'true',
        description: 'Toggle the smooth radial glow that follows the cursor behind the card'
      },
      {
        name: 'behindGlowColor',
        type: 'string',
        default: '"rgba(125, 190, 255, 0.67)"',
        description: 'CSS color for the behind-the-card glow (e.g. rgba/hsla/hex)'
      },
      {
        name: 'behindGlowSize',
        type: 'string',
        default: '"50%"',
        description: 'Size of the glow as a length/percentage stop in the radial gradient'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional CSS classes to apply to the card wrapper'
      },
      {
        name: 'enableTilt',
        type: 'boolean',
        default: 'true',
        description: 'Enable or disable the 3D tilt effect on mouse hover'
      },
      {
        name: 'enableMobileTilt',
        type: 'boolean',
        default: 'false',
        description: 'Enable or disable the 3D tilt effect on mobile devices'
      },
      {
        name: 'mobileTiltSensitivity',
        type: 'number',
        default: '5',
        description: 'Sensitivity of the 3D tilt effect on mobile devices'
      },
      {
        name: 'miniAvatarUrl',
        type: 'string',
        default: 'undefined',
        description: 'Optional URL for a smaller avatar in the user info section'
      },
      {
        name: 'name',
        type: 'string',
        default: '"Javi A. Torres"',
        description: "User's display name"
      },
      {
        name: 'title',
        type: 'string',
        default: '"Software Engineer"',
        description: "User's job title or role"
      },
      {
        name: 'handle',
        type: 'string',
        default: '"javicodes"',
        description: "User's handle or username (displayed with @ prefix)"
      },
      {
        name: 'status',
        type: 'string',
        default: '"Online"',
        description: "User's current status"
      },
      {
        name: 'contactText',
        type: 'string',
        default: '"Contact"',
        description: 'Text displayed on the contact button'
      },
      {
        name: 'showUserInfo',
        type: 'boolean',
        default: 'true',
        description: 'Whether to display the user information section'
      },
      {
        name: 'onContactClick',
        type: 'function',
        default: 'undefined',
        description: 'Callback function called when the contact button is clicked'
      }
    ],
    []
  );

  const computedProps = useMemo(
    () => ({
      iconUrl: showIcon ? '/assets/demo/iconpattern.png' : undefined,
      behindGlowEnabled: showBehindGlow,
      innerGradient: customInnerGradient
    }),
    [showIcon, showBehindGlow, customInnerGradient]
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['showIcon', 'showBehindGlow', 'customInnerGradient']}
      computedProps={computedProps}
    >
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={700} overflow="hidden">
            <ProfileCard
              key={key}
              name="Javi A. Torres"
              title="Software Engineer"
              handle="javicodes"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/assets/demo/person.webp"
              iconUrl={showIcon ? '/assets/demo/iconpattern.png' : ''}
              showUserInfo={showUserInfo}
              grainUrl="/assets/demo/grain.webp"
              behindGlowEnabled={showBehindGlow}
              behindGlowColor={behindGlowColor}
              innerGradient={customInnerGradient}
              enableMobileTilt={enableMobileTilt}
            />
          </Box>{' '}
          <Customize>
            <PreviewSwitch
              title="Behind Glow"
              isChecked={showBehindGlow}
              onChange={() => {
                updateProp('showBehindGlow', !showBehindGlow);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Show Icon Pattern"
              isChecked={showIcon}
              onChange={() => {
                updateProp('showIcon', !showIcon);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Show User Info"
              isChecked={showUserInfo}
              onChange={() => {
                updateProp('showUserInfo', !showUserInfo);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Enable Mobile Tilt"
              isChecked={enableMobileTilt}
              onChange={() => {
                updateProp('enableMobileTilt', !enableMobileTilt);
                forceRerender();
              }}
            />
          </Customize>
          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={profileCard} componentName="ProfileCard" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ProfileCardDemo;
