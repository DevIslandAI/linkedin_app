import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import { Lightbulb, Sparkles, Copy, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { LinkedInPostPreview } from "./components/LinkedInPostPreview";
import { PostEditor } from "./components/PostEditor";
import { Toaster } from "./components/ui/sonner";

interface PostType {
  id: string;
  title: string;
  description: string;
  caption: string;
}

interface PostTypeOption {
  id: string;
  title: string;
  description: string;
}

const POST_TYPE_OPTIONS: PostTypeOption[] = [
  {
    id: "1",
    title: 'The "Business Process Insight" Post',
    description:
      "This post explains a core business principle, such as the need to optimize existing processes before implementing AI, positioning Island AI as a strategic thinker. It should be direct and educational.",
  },
  {
    id: "2",
    title: 'The "Training Promotion" Post',
    description:
      "This post will address the common management challenge of wanting to implement AI but not knowing where to start, positioning the 'AI & Automation Mastery Training' as the clear first step.",
  },
  {
    id: "3",
    title: 'The "Storytelling" Post',
    description:
      "This post will use a narrative or anecdotal style to illustrate a common business problem that AI and automation can solve, making the solution more relatable. It often starts with a personal reflection.",
  },
  {
    id: "4",
    title: 'The "Client Problem Snippet" Post',
    description:
      "This post will describe a real-world, anonymized client challenge and hint at the successful outcome, building curiosity and credibility.",
  },
];

const QUICK_START_IDEAS = [
  {
    label: "Business Insight",
    prompt:
      "Create ideas about core business principles and strategic approaches to AI implementation, focusing on optimizing existing processes before automation",
  },
  {
    label: "Training",
    prompt:
      "Generate ideas for promoting AI training programs and addressing common challenges managers face when starting their AI journey",
  },
  {
    label: "Storytelling",
    prompt:
      "Brainstorm narrative ideas and personal stories about businesses solving problems through AI and automation",
  },
  {
    label: "Client Success",
    prompt:
      "Think of real-world client challenges and successful outcomes that demonstrate the impact of AI solutions",
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"brainstorm" | "generate" | "edit">("brainstorm");
  const [brainstormInput, setBrainstormInput] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [selectedPostTypes, setSelectedPostTypes] = useState<Set<string>>(new Set());
  const [generatedPosts, setGeneratedPosts] = useState<PostType[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isGeneratingPosts, setIsGeneratingPosts] = useState(false);
  const [editingPost, setEditingPost] = useState<{ id: string; content: string } | null>(null);

  const handleBrainstorm = () => {
    setIsGeneratingIdeas(true);
    // Simulate API call
    setTimeout(() => {
      const mockIdeas = [
        "How to optimize your business processes before implementing AI solutions",
        "The common pitfall of rushing into AI without proper training",
        "A story about a company that transformed their workflow with automation",
        "Real-world challenge: Manual data entry costing 20 hours per week",
        "Why 80% of AI implementations fail (and how to be in the 20%)",
      ];
      setIdeas(mockIdeas);
      setIsGeneratingIdeas(false);
    }, 1000);
  };

  const handleGeneratePosts = () => {
    if (selectedPostTypes.size === 0) return;

    setIsGeneratingPosts(true);
    // Simulate API call
    setTimeout(() => {
      const allPostTemplates: Record<
        string,
        {
          title: string;
          description: string;
          captions: string[];
        }
      > = {
        "1": {
          title: 'The "Business Process Insight" Post',
          description:
            "This post explains a core business principle, such as the need to optimize existing processes before implementing AI, positioning Island AI as a strategic thinker. It should be direct and educational.",
          captions: [
            `Stop. Before you implement AI, ask yourself this:

Have you optimized your existing processes?

Here's the truth most consultants won't tell you:
AI doesn't fix broken processes. It amplifies them.

If your current workflow is inefficient, adding AI is like putting a Ferrari engine in a car with square wheels.

The smart approach:
1. Map your current process
2. Remove bottlenecks
3. Standardize procedures
4. THEN apply AI strategically

At Island AI, we've seen companies waste $100K+ on AI tools that solve the wrong problems.

Don't be one of them.

Optimize first. Automate second.`,
            `The biggest AI mistake I see:

Companies automate broken processes.

Here's what happens:
→ They have a manual process that takes 8 hours
→ They throw AI at it
→ Now they have an automated mess that creates 8 hours of cleanup work

The fix is simple but not easy:

1. Document your current process
2. Identify what's actually necessary
3. Remove redundant steps
4. Streamline what remains
5. Only THEN add automation

AI is a multiplier, not a solution.

If you multiply garbage by 10, you get 10x the garbage.

Start with solid foundations.`,
            `Want to know the #1 predictor of AI implementation success?

It's not the budget.
It's not the technology.
It's not even the team.

It's process maturity.

Companies with documented, optimized processes see 3x better ROI on AI investments.

Why? Because AI amplifies what you already do.

If your process is chaos, AI automates chaos.
If your process is efficient, AI makes it exceptional.

Before you invest in AI:
→ Map your workflows
→ Remove bottlenecks
→ Standardize procedures
→ Train your team

Then, and only then, add intelligence.

The best AI implementation starts with human optimization.`,
            `Here's a uncomfortable truth about AI in business:

Most companies aren't ready for it.

Not because they lack the budget or the tech talent.

But because they're trying to automate processes they don't fully understand.

Think about it:
→ Can you draw your current workflow on a whiteboard?
→ Do your team members follow the same process?
→ Can you identify which steps actually create value?

If you answered "no" to any of these, pause the AI initiative.

First:
1. Document everything
2. Eliminate waste
3. Standardize the best practices
4. Get team buy-in

The companies winning with AI aren't the ones with the biggest budgets.

They're the ones with the clearest processes.`,
            `AI won't save a broken process.

I learned this the hard way.

A client came to us spending $200K annually on manual reporting. They wanted AI to automate it all.

We audited their process and found:
→ 40% of the reports were never read
→ 25% contained duplicate information
→ Teams were reformatting the same data 3 different ways

We didn't build an AI solution.

We eliminated 40% of the reports.
We consolidated the rest.
We created one standardized format.

Then we added simple automation.

Result: $160K saved annually.
AI investment: $0.

Sometimes the best AI strategy is no AI at all.

Just better processes.`,
          ],
        },
        "2": {
          title: 'The "Training Promotion" Post',
          description:
            "This post will address the common management challenge of wanting to implement AI but not knowing where to start, positioning the 'AI & Automation Mastery Training' as the clear first step.",
          captions: [
            `"We need to implement AI... but where do we even start?"

This is the #1 question I hear from business leaders.

You know AI can transform your operations.
You see competitors making moves.
But the path forward feels... unclear.

Here's what usually happens:
→ You research tools (there are thousands)
→ You pick one that sounds good
→ Your team doesn't adopt it
→ $10K+ wasted, zero ROI

The real problem? You skipped the foundation.

Our AI & Automation Mastery Training exists for exactly this moment.

We don't just show you tools.
We teach you:
→ How to identify high-impact opportunities
→ The decision framework for choosing solutions
→ Change management strategies that actually work

Stop researching. Start implementing.

DM me "TRAINING" to learn more.`,
            `Your team wants to use AI.
Your competitors are using AI.
Your board is asking about AI.

But you have no idea where to start.

Sound familiar?

The problem isn't a lack of AI tools (there are thousands).
The problem is a lack of AI strategy.

Most companies approach AI backwards:
1. Pick a tool
2. Try to find a use case
3. Force adoption
4. Wonder why it failed

The right approach:
1. Identify your biggest bottleneck
2. Calculate the cost of inaction
3. Map potential solutions
4. Choose tools that fit your workflow
5. Train your team properly

This is exactly what we teach in our AI & Automation Mastery Training.

No fluff. No theory. Just practical frameworks you can use Monday morning.

Ready to stop researching and start implementing?

DM me "TRAINING"`,
            `I talked to 3 CEOs this week.

All said the same thing:

"We know we need AI. We just don't know where to start."

Here's why you're stuck:

You're looking for the perfect solution.
You're waiting for clarity.
You're trying to understand everything before you begin.

But here's the truth:

The best AI implementation isn't perfect.
It's practical.

Start with one process.
One pain point.
One 10-hour-per-week task.

Automate that.
Learn from it.
Scale what works.

This is the exact methodology we teach in our AI & Automation Mastery Training.

Not "how to use ChatGPT."
But how to identify opportunities, build business cases, and drive adoption.

The kind of training that pays for itself in week one.

Interested? DM me "TRAINING"`,
            `Your AI strategy shouldn't start with technology.

It should start with a question:

"What are we currently doing manually that we shouldn't be?"

Not "what could AI do?"
But "what should AI do for us specifically?"

This shift changes everything.

Instead of chasing the latest tool, you're solving real problems.
Instead of forcing adoption, you're creating value.

In our AI & Automation Mastery Training, we spend 80% of the time on strategy and 20% on tools.

Because the right strategy makes tool selection obvious.
The wrong strategy makes every tool feel like a gamble.

We teach you:
→ How to audit your operations for AI opportunities
→ How to calculate ROI before you invest
→ How to build adoption into your implementation

If you're tired of random AI experiments and ready for systematic results...

DM me "TRAINING"`,
            `Here's what separates companies that succeed with AI from those that don't:

Training.

Not technical training.
Strategic training.

Most companies teach their team how to use AI tools.

The winners teach their team how to think about AI strategically.

They answer:
→ Which problems should we solve first?
→ How do we measure success?
→ What does adoption actually look like?
→ How do we scale what works?

This is the foundation of our AI & Automation Mastery Training.

We're not teaching ChatGPT prompts (you can Google that).

We're teaching decision frameworks that turn AI from a buzzword into a business advantage.

The ROI is simple:
If you save 10 hours per week at $50/hour, the training pays for itself in 3 weeks.

Most participants hit that in week one.

Ready to move from AI confusion to AI clarity?

DM me "TRAINING"`,
          ],
        },
        "3": {
          title: 'The "Storytelling" Post',
          description:
            "This post will use a narrative or anecdotal style to illustrate a common business problem that AI and automation can solve, making the solution more relatable. It often starts with a personal reflection.",
          captions: [
            `I'll never forget the call I got at 11 PM on a Tuesday.

My client, a CEO of a growing logistics company, was in his office.
Again.
For the 6th night in a row.

"I'm drowning," he said. "We're growing, but I'm working more hours than when we started."

Sound familiar?

Here's what we discovered:
His team spent 25+ hours per week on manual data entry, invoice processing, and follow-up emails.

Tasks that felt "quick" individually.
But collectively? They were killing the business.

We implemented a simple automation system.
Nothing fancy. Just smart.

3 months later:
→ 25 hours reclaimed every week
→ Team focused on strategic work
→ CEO home for dinner with his kids

The tools existed all along.
He just needed someone to show him where to look.

That's what we do at Island AI.

If you're working harder but not smarter, let's talk.`,
            `My client sent me a spreadsheet at 2 AM.

"This took me 6 hours," the subject line read.

I opened it. Financial reconciliation. 200 rows. Manual data entry from 3 different sources.

"How often do you do this?" I asked the next morning.

"Every week."

Every. Single. Week.

That's 312 hours per year.
On a task that could be automated in 3 days.

We built a simple workflow:
→ Auto-pull data from all 3 sources
→ Run reconciliation checks
→ Flag discrepancies for human review

Now it takes 15 minutes.

The same client who sent spreadsheets at 2 AM?

Now sends me photos from his kid's soccer games.

That's what good automation does.

It doesn't replace humans.
It returns them to their lives.`,
            `She walked into our first meeting with 3 laptops.

"I know, I know," she laughed. "But I need all of them."

One for email.
One for project management.
One for reporting.

She spent 2 hours every morning just copying information between systems.

"It's just how we work," she said.

But here's the thing:
It wasn't how they had to work.

We connected the systems.
Created automated data flows.
Built one dashboard that showed everything.

The 3-laptop setup became a 1-laptop workflow.

2 hours became 15 minutes.

The best part?

She didn't need to learn new software.
We made her existing tools talk to each other.

Six months later, she sent me a photo.

Two of the laptops were in a closet.

"Haven't touched them since June," the message said.

Sometimes the best technology is the kind you stop thinking about.`,
            `"I hired you because I'm failing my team."

That's how the conversation started.

The owner of a growing e-commerce brand.
23 employees.
$5M in revenue.
And completely burned out.

"I can't scale," he said. "Every new customer requires manual work. Every order requires follow-up. I'm the bottleneck."

We spent a week just observing.

What we found:
→ Customer service answering the same 12 questions repeatedly
→ Manual order confirmations
→ Inventory updates done by hand
→ Team waiting on him for approvals

None of it needed to happen.

We built:
→ An AI chatbot for the FAQ questions
→ Automated order workflows
→ Real-time inventory sync
→ Approval routing based on order value

3 months later, I got a message:

"We hit $7M this year. Same team size. And I took my first vacation in 4 years."

That's not a technology story.

It's a human one.`,
            `The email came at midnight:

"I think I need to shut down."

A 15-year-old consulting firm.
Founder in her 50s.
Revenue declining.
Competitors moving faster.

"They have AI. I have Excel," she wrote.

We met the next week.

I asked her to walk me through her typical project.

Client intake: 2 hours of data entry
Proposal creation: 4 hours of copying/pasting
Project tracking: Manual spreadsheets
Reporting: Built from scratch every time

She wasn't behind because of AI.
She was behind because she was doing work that shouldn't exist.

We didn't implement fancy AI.

We:
→ Created proposal templates that auto-populate
→ Set up simple project tracking automation
→ Built standard reports that update automatically

Her "AI competitors"?

They were just less inefficient.

6 months later:
→ Same number of clients
→ Half the admin time
→ Revenue up 40%

She didn't shut down.

She evolved.

And she did it without becoming a tech company.

Just a smarter one.`,
          ],
        },
        "4": {
          title: 'The "Client Problem Snippet" Post',
          description:
            "This post will describe a real-world, anonymized client challenge and hint at the successful outcome, building curiosity and credibility.",
          captions: [
            `Client challenge (Q4 2024):

A manufacturing company was losing $15K monthly due to inventory tracking errors.

Their system:
→ Manual spreadsheets
→ 3 different software tools
→ Zero integration
→ Constant discrepancies

The finance team and operations team literally had different "versions of truth."

We stepped in with a focused AI automation strategy.

The result after 8 weeks:
→ 94% reduction in tracking errors
→ Real-time inventory visibility
→ $180K annual savings
→ Teams finally speaking the same language

The best part?
We didn't replace their entire system.
We made their existing tools work together intelligently.

Sometimes the solution isn't more software.
It's smarter integration.

#AIAutomation #BusinessEfficiency #ProcessOptimization`,
            `Client challenge (January 2025):

A real estate agency was spending 30 hours/week on lead qualification.

Their process:
→ Manually reviewing every inquiry
→ Copying data into their CRM
→ Sending personalized responses
→ Scheduling follow-ups

Only 15% of leads were actually qualified buyers.

85% of the work was wasted effort.

We implemented an AI-powered lead scoring system.

The results after 6 weeks:
→ Agents focus only on hot leads
→ Response time cut from 4 hours to 4 minutes
→ Conversion rate up 60%
→ 25 hours per week reclaimed

They didn't hire more agents.

They just stopped wasting time on the wrong leads.

#RealEstate #AIAutomation #SalesEfficiency`,
            `Client challenge (December 2024):

An accounting firm was drowning in year-end work.

Every December:
→ 80-hour work weeks
→ Missed family events
→ Errors from exhaustion
→ Clients frustrated with delays

They thought it was just "the nature of the business."

We showed them it wasn't.

We automated:
→ Data collection from clients
→ Basic reconciliation checks
→ Report generation
→ Error flagging

This December:
→ Same number of clients
→ Zero overtime
→ 40% faster delivery
→ Happiest team they've ever had

One partner called it "the first December I enjoyed in 15 years."

Busy season doesn't have to mean burnout.

#Accounting #Automation #WorkLifeBalance`,
            `Client challenge (November 2024):

A healthcare clinic was losing patients due to slow appointment scheduling.

The problem:
→ Phone-only scheduling
→ Average wait time: 8 minutes
→ 40% of callers hung up
→ Staff overwhelmed during peak hours

Lost revenue: ~$30K monthly from abandoned bookings.

We implemented automated scheduling.

Patients could now:
→ Book online 24/7
→ Get instant confirmation
→ Reschedule without calling
→ Receive automated reminders

Results after 2 months:
→ Appointment bookings up 55%
→ No-shows down 40%
→ Staff stress levels dramatically reduced
→ $360K additional annual revenue

The phone still rings.

But now it's for things that actually need human attention.

#Healthcare #PatientExperience #Automation`,
            `Client challenge (October 2024):

A marketing agency was spending 15 hours weekly on client reporting.

Every Monday:
→ Pull data from 6 platforms
→ Copy into PowerPoint
→ Write analysis
→ Email to 12 clients

The founder's words: "I started an agency to do creative work, not data entry."

We built automated reporting dashboards.

Now the system:
→ Pulls real-time data automatically
→ Generates visual reports
→ Sends to clients on schedule
→ Alerts only on significant changes

Monday mornings transformed:
→ 15 hours became 30 minutes
→ Reports went from weekly to daily
→ Clients got better insights
→ Team could focus on strategy

They didn't lose the personal touch.

They just stopped doing robot work.

#MarketingAgency #Automation #ClientReporting`,
          ],
        },
      };

      // Generate 5 variations for each selected post type
      const posts: PostType[] = [];
      Array.from(selectedPostTypes).forEach((typeId) => {
        const template = allPostTemplates[typeId];
        template.captions.forEach((caption, index) => {
          posts.push({
            id: `${typeId}-${index}`,
            title: template.title,
            description: template.description,
            caption: caption,
          });
        });
      });

      setGeneratedPosts(posts);
      setIsGeneratingPosts(false);
    }, 1500);
  };

  const togglePostTypeSelection = (postTypeId: string) => {
    setSelectedPostTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postTypeId)) {
        newSet.delete(postTypeId);
      } else {
        newSet.add(postTypeId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleIdeaClick = (idea: string) => {
    setSelectedIdea(idea);
    setCurrentPage("generate");
  };

  const handleQuickStart = (prompt: string) => {
    setBrainstormInput(prompt);
  };

  const handleNextToGenerate = () => {
    if (selectedIdea) {
      setCurrentPage("generate");
    }
  };

  const handleEditPost = (postId: string, content: string) => {
    setEditingPost({ id: postId, content });
    setCurrentPage("edit");
  };

  const handleSavePost = (content: string) => {
    if (editingPost) {
      setGeneratedPosts((prev) =>
        prev.map((post) =>
          post.id === editingPost.id ? { ...post, caption: content } : post
        )
      );
    }
    setEditingPost(null);
  };

  const handleBackFromEditor = () => {
    setEditingPost(null);
    setCurrentPage("generate");
  };

  // Show editor page
  if (currentPage === "edit" && editingPost) {
    return (
      <PostEditor
        content={editingPost.content}
        onBack={handleBackFromEditor}
        onSave={handleSavePost}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3">LinkedIn Post Crafter</h1>
          <p className="text-muted-foreground">
            Generate engaging LinkedIn content with AI-powered insights
          </p>
          
          {/* Page Navigation Indicator */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className={`flex items-center gap-2 ${currentPage === "brainstorm" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentPage === "brainstorm" ? "border-primary bg-primary/10" : "border-muted-foreground/30"}`}>
                1
              </div>
              <span className="text-sm">Brainstorm</span>
            </div>
            <div className="w-12 h-0.5 bg-border"></div>
            <div className={`flex items-center gap-2 ${currentPage === "generate" ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentPage === "generate" ? "border-primary bg-primary/10" : "border-muted-foreground/30"}`}>
                2
              </div>
              <span className="text-sm">Generate</span>
            </div>
          </div>
        </div>

        {/* Page 1: Brainstorm Section */}
        {currentPage === "brainstorm" && (
          <Card className="p-8 border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <h2>Brainstorm Ideas</h2>
            </div>

            <div className="mb-4">
              <p className="text-muted-foreground text-sm mb-3">
                Quick Start:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_START_IDEAS.map((idea, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickStart(idea.prompt)}
                    className="text-sm"
                  >
                    {idea.label}
                  </Button>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Enter a topic, challenge, or theme for your LinkedIn post... (e.g., 'AI implementation challenges for small businesses')"
              value={brainstormInput}
              onChange={(e) => setBrainstormInput(e.target.value)}
              className="mb-4 min-h-24 resize-none bg-input-background border-border/50"
            />

            <Button
              onClick={handleBrainstorm}
              disabled={!brainstormInput.trim() || isGeneratingIdeas}
              className="w-full sm:w-auto"
            >
              {isGeneratingIdeas ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Ideas
                </>
              )}
            </Button>

            {ideas.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-muted-foreground text-sm">
                  Generated Ideas (click to select):
                </p>
                {ideas.map((idea, index) => (
                  <div
                    key={index}
                    onClick={() => handleIdeaClick(idea)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
                      selectedIdea === idea
                        ? "bg-primary/10 border-primary/50"
                        : "bg-muted/30 border-border/30 hover:bg-muted/50 hover:border-border/50"
                    }`}
                  >
                    <p className="text-foreground/90">{idea}</p>
                  </div>
                ))}
                
                {selectedIdea && (
                  <Button
                    onClick={handleNextToGenerate}
                    className="w-full mt-6"
                  >
                    Continue to Generate Posts
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Page 2: Generate Posts Section */}
        {currentPage === "generate" && (
          <Card className="p-8 border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2>Generate Posts</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentPage("brainstorm");
                  setGeneratedPosts([]);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Brainstorm
              </Button>
            </div>

            {selectedIdea && (
              <div className="mb-6">
                <p className="text-muted-foreground text-sm mb-2">
                  Selected Idea:
                </p>
                <Textarea
                  value={selectedIdea}
                  onChange={(e) => setSelectedIdea(e.target.value)}
                  className="min-h-20 resize-none bg-input-background border-border/50"
                  placeholder="Select an idea or enter your own..."
                />
              </div>
            )}

            {/* Show Post Type Selection OR Post Previews */}
            {generatedPosts.length === 0 ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-muted-foreground text-sm">
                      Select post types to generate:
                    </p>
                    {selectedPostTypes.size > 0 && (
                      <p className="text-sm text-primary">
                        {selectedPostTypes.size} selected
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    {POST_TYPE_OPTIONS.map((postType) => (
                      <Card
                        key={postType.id}
                        className="p-4 border-border/50 hover:border-border transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                        onClick={() => togglePostTypeSelection(postType.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`type-${postType.id}`}
                            checked={selectedPostTypes.has(postType.id)}
                            className="mt-1 pointer-events-none"
                          />
                          <div className="flex-1">
                            <h4 className="mb-1">{postType.title}</h4>
                            <p className="text-muted-foreground text-sm">
                              {postType.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGeneratePosts}
                  disabled={
                    isGeneratingPosts ||
                    !selectedIdea ||
                    selectedPostTypes.size === 0
                  }
                  className="w-full"
                >
                  {isGeneratingPosts ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                      Generating Posts...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Selected Posts
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                {/* Post Previews */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-muted-foreground text-sm">
                      Click any post to copy the content
                    </p>
                    <p className="text-sm text-primary">
                      {generatedPosts.length} variations
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {generatedPosts.map((post) => (
                      <LinkedInPostPreview
                        key={post.id}
                        content={post.caption}
                        onCopy={copyToClipboard}
                        onEdit={(content) => handleEditPost(post.id, content)}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setGeneratedPosts([]);
                    setSelectedPostTypes(new Set());
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Generate New Posts
                </Button>
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
