import { useState , useEffect } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Center, PasswordInput, Text, TextInput, Tooltip } from '@mantine/core';

function TooltipIcon({setEmail , email}) {
    const [value, setValue] = useState('');
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transitionProps={{ transition: 'pop-bottom-right' }}
    >
      <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

 

  useEffect(()=>{
    setEmail(value);

  },[value])


  return (
    <TextInput
    rightSection={rightSection}
    label="Email"
    placeholder="Your email"
    value={value}
    onChange={(event) => {setValue(event.currentTarget.value);
           
  } }    />
  );
}

function TooltipFocus() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  const valid = value.trim().length >= 6;
  return (
    <Tooltip
      label={valid ? 'All good!' : 'Password must include at least 6 characters'}
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? 'teal' : undefined}
      withinPortal
    >
      <PasswordInput
        label="Password"
        required
        placeholder="Your password"
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => {setValue(event.currentTarget.value);
            console.log(value)
        } }
      />
    </Tooltip>
  );
}

export function InputTooltip({setMdp , setEmail, email }) {

    const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  const valid = value.trim().length >= 6;


  

    useEffect(()=>{

    },[email])

    useEffect(()=>{
        setMdp(value);
    
      },[value])

  return (
    <>
        <TooltipIcon setEmail={setEmail} email={email} /> 
      <Tooltip
      label={valid ? 'All good!' : 'Password must include at least 6 characters'}
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? 'teal' : undefined}
      withinPortal
    >
      <PasswordInput
        label="Password"
        required
        placeholder="Your password"
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => {setValue(event.currentTarget.value);
            setMdp(value);
        } }
      />
    </Tooltip>
      <div>

      </div>
    </>
  );
}