import{j as e}from"./jsx-runtime-u17CrQMm.js";import{G as a}from"./Grid-DqwNY_pd.js";import{T as t}from"./Text-C0s_Vhh0.js";import"./classNames-DF_qxsha.js";const l={title:"Foundations/Tokens",tags:["autodocs"]},n=[["--color-bg","Background"],["--color-surface","Surface"],["--color-surface-2","Surface 2"],["--color-accent","Accent"],["--color-text","Text"],["--color-text-muted","Muted Text"]],r={render:()=>e.jsx(a,{columns:"auto-fit",minItemWidth:"220",gap:"4",children:n.map(([o,s])=>e.jsxs("div",{children:[e.jsx("div",{style:{height:"88px",borderRadius:"var(--radius-md)",border:"1px solid var(--color-border-subtle)",background:`var(${o})`,marginBottom:"var(--space-2)"}}),e.jsx(t,{size:"sm",weight:"semibold",children:s}),e.jsx(t,{size:"sm",tone:"muted",children:o})]},o))})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="auto-fit" minItemWidth="220" gap="4">
      {swatches.map(([token, label]) => <div key={token}>
          <div style={{
        height: "88px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border-subtle)",
        background: \`var(\${token})\`,
        marginBottom: "var(--space-2)"
      }} />
          <Text size="sm" weight="semibold">
            {label}
          </Text>
          <Text size="sm" tone="muted">
            {token}
          </Text>
        </div>)}
    </Grid>
}`,...r.parameters?.docs?.source}}};const u=["ColorTokens"];export{r as ColorTokens,u as __namedExportsOrder,l as default};
