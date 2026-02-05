<form
  action="https://formspree.io/f/mwvqgjrw"
  method="POST"
  className="space-y-6"
>
  <div className="grid md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-medium">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        placeholder="Your name"
        required
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        placeholder="your.email@example.com"
        required
      />
    </div>
  </div>

  <div className="space-y-2">
    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
    <input
      type="text"
      id="subject"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      placeholder="What's this about?"
      required
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-medium">Message</label>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      rows={5}
      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
      placeholder="Tell me about your project or just say hello!"
      required
    />
  </div>

  <!-- Optional hidden fields for Formspree (commented) -->
  {/* <input type="hidden" name="_subject" value="New contact form submission" /> */}
  {/* <input type="hidden" name="_redirect" value="https://your-site.com/thank-you" /> */}

  <button
    type="submit"
    className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
  >
    Send Message
  </button>
</form>