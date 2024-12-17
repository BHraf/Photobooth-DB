import {  Table ,Anchor } from '@mantine/core';
import "./Mant.css"
const data1 = [
    {
      NUMBER: 1,
      PRICE: '1,5',
      GENDER: 'Male',
      CHARACTER: '',
      TIME: 'Wed Nov 27 2024 20:00:39 ',
      RESULT: 'https://firebasestorage.googleapis.com/v0/b/photobooth-466c7.appspot.com/o/results%2FimageJQnOy4Zivl9OqKds.png?alt=media&token=a4a005a1-590a-412e-82c2-5f950fe71507'
    },
    {
      NUMBER: 2,
      PRICE: '1,5',
      GENDER: 'Male',
      CHARACTER: 'Geralt',
      TIME: 'Thu Nov 28 2024 21:04:09 ',
      RESULT: 'https://d3aa3s3yhl0emm.cloudfront.net/output/lx/avatarify/14d6c73813ab41eb838a45c90585ea15_1024x610.jpg'
    },
    {
      NUMBER: 3,
      PRICE: '1,5',
      GENDER: 'Female',
      CHARACTER: '2-disney pixar style',
      TIME: 'Fri Nov 29 2024 19:54:52',
      RESULT: 'https://d3aa3s3yhl0emm.cloudfront.net/output/lx/avatarify/5d73e590b5d3467c9f25e37e5d8ade73_1024x610.jpg'
    },
    {
      NUMBER: 4,
      PRICE: '1,5',
      GENDER: 'Male',
      CHARACTER: '',
      TIME: 'Tue Dec 03 2024 22:00:11',
      RESULT: 'https://firebasestorage.googleapis.com/v0/b/photobooth-466c7.appspot.com/o/results%2FimageJy6UQmV5syVNiWCn.png?alt=media&token=3fe49c99-ed05-4335-ae94-40c3d40ed6e2'
    },
    {
      NUMBER: 5,
      PRICE: '1,5',
      GENDER: 'Male',
      CHARACTER: '',
      TIME: 'Wed Dec 04 2024 16:42:10',
      RESULT: 'https://firebasestorage.googleapis.com/v0/b/photobooth-466c7.appspot.com/o/results%2Fimageh2EiOy724znLRkNP.png?alt=media&token=bdf0d9a9-5289-4685-aa43-b54b9decb0a9'
    }
  ]

export function TableReviews({data}) {
  const rows = data.map((row) => {


    return (
      <Table.Tr key={row.NUMBER}>
        <Table.Td>
            {row.NUMBER}
          
        </Table.Td>
        <Table.Td>{row.PRICE}</Table.Td>
        <Table.Td>
            {row.GENDER}
        </Table.Td>
        <Table.Td>
            {row.CHARACTER}
        </Table.Td>
        <Table.Td>
            <div style={{'width':'150px'}}>
            {row.TIME}
            </div>
        </Table.Td>
        <Table.Td>
        <div style={{'width':'650px'}}>
        <Anchor component="button" fz="sm">
        {row.RESULT}
        </Anchor>
            </div>
        
        </Table.Td>
          
        
      </Table.Tr>
    );
  });

  return (
      <Table.ScrollContainer minWidth={800} >
      <Table  withColumnBorders striped highlightOnHover withTableBorder horizontalSpacing="sm" verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>NUMBER</Table.Th>
            <Table.Th>PRICE</Table.Th>
            <Table.Th>GENDER</Table.Th>
            <Table.Th>CHARACTER</Table.Th>
            <Table.Th>
            <div style={{'textAlign':'center'}}>
            TIME
                </div>
                </Table.Th>
            <Table.Th><div style={{'textAlign':'center'}}>
                RESULT
                </div></Table.Th>
          </Table.Tr>
        </Table.Thead>
        
        <Table.Tbody >{rows} </Table.Tbody>
        
        
      </Table>
    </Table.ScrollContainer>
  );
}