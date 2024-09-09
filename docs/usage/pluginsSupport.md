# Using with Other Plugins

Tab content is rendered using [`MarkdownRenderer.render()`](<https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render#MarkdownRenderer.render()+method>), which uses Obsidian's reading mode rendering. Therefore, it can be used in combination with many plugins.

::: details Nesting Code Blocks in Markdown

Markdown has two formats for nesting code blocks:

When using only one type of backtick, the outer code block must use more backticks than the inner code block.

`````
````tabs
tab: python
```python
print("Hello Tabs")
```

tab: javascript
```javascript
console.log('Hello Tabs');
````
`````

![tabs-5](../assets/tabs-5.png)

When using two types of backticks to generate code blocks, only the same type of backtick needs to be used to ensure that the outer code block uses more backticks than the inner code block.

````
~~~tabs
tab: python
```python
print("Hello Tabs")
```

tab: javascript
```javascript
console.log('Hello Tabs');
```
~~~
````

:::

## With Dataview & Tasks

![Tabs&Dataview](../assets/tabs-3.png)

![Tabs&Dataview](../assets/tabs-showcase-01-by-DeusEx01.png)

From [DeusEx01](https://github.com/xhuajin/obsidian-tabs/issues/28)

## With mermaid

![Tabs&Mermaid](../assets/with-mermaid-en.png)

::: details Source code

`````md
````tabs

tab: <span style="color: transparent; background:-webkit-linear-gradient(120deg, #bd34fe 30%, #ff3670); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Mermaid</span>
Mermaid allows you to create charts and visualizations using text and code.

It is a chart drawing tool based on JavaScript that renders Markdown-inspired text definitions to dynamically create and modify charts.
tab: Flowchart
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
tab: Sequence Diagram
```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
tab: Git Diagram
```mermaid
    gitGraph
       commit
       commit
       branch develop
       commit
       commit
       commit
       checkout main
       commit
       commit
```
tab: User Journey Diagram
```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```
tab: Quadrant Chart
```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```
tab: XY Chart
```mermaid
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
```
````
`````

:::
