import{j as e}from"./jsx-runtime-u17CrQMm.js";import{I as d}from"./Inline-tEPJUPwr.js";import{C as t}from"./Cluster-lLzeEpmN.js";import{G as i}from"./Grid-DqwNY_pd.js";import{C as r}from"./Card-BGC0ih4d.js";import"./classNames-DF_qxsha.js";const u={title:"UI/Layout Primitives",tags:["autodocs"]},s={render:()=>e.jsxs(d,{gap:"3",align:"center",children:[e.jsx(r,{density:"sm",children:"One"}),e.jsx(r,{density:"sm",children:"Two"}),e.jsx(r,{density:"sm",children:"Three"})]})},a={render:()=>e.jsxs(t,{gap:"2",align:"center",children:[e.jsx(r,{density:"sm",children:"Alpha"}),e.jsx(r,{density:"sm",children:"Beta"}),e.jsx(r,{density:"sm",children:"Gamma"}),e.jsx(r,{density:"sm",children:"Delta"})]})},n={render:()=>e.jsxs(i,{columns:"auto-fit",minItemWidth:"220",gap:"4",children:[e.jsx(r,{children:"One"}),e.jsx(r,{children:"Two"}),e.jsx(r,{children:"Three"}),e.jsx(r,{children:"Four"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Inline gap="3" align="center">
      <Card density="sm">One</Card>
      <Card density="sm">Two</Card>
      <Card density="sm">Three</Card>
    </Inline>
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Cluster gap="2" align="center">
      <Card density="sm">Alpha</Card>
      <Card density="sm">Beta</Card>
      <Card density="sm">Gamma</Card>
      <Card density="sm">Delta</Card>
    </Cluster>
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="auto-fit" minItemWidth="220" gap="4">
      <Card>One</Card>
      <Card>Two</Card>
      <Card>Three</Card>
      <Card>Four</Card>
    </Grid>
}`,...n.parameters?.docs?.source}}};const x=["InlineExample","ClusterExample","GridExample"];export{a as ClusterExample,n as GridExample,s as InlineExample,x as __namedExportsOrder,u as default};
