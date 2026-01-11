---
title: "GitOps: The Future of Continuous Delivery with ArgoCD and Flux"
date: 2024-01-10
author: "Integr8 Team"
description: "Discover how GitOps transforms the way teams manage infrastructure and deployments on Kubernetes"
category: "devops"
tags: ["GitOps", "ArgoCD", "Flux", "Kubernetes", "CI/CD"]
image: "/images/blog/gitops-cover.png"
read_time: 8
featured: true
---

The way we manage infrastructure and deployments has changed dramatically over the last 5 years. **GitOps** is a paradigm shift where Git becomes the single source of truth.

## What is GitOps?

GitOps is an operational model that brings DevOps practices to infrastructure management. Its pillars are:

1. **Declarative over Imperative** - The entire system is described declaratively (YAML, Terraform)
2. **Git as the Source of Truth** - Desired state versioned in Git
3. **Automatic Reconciliation** - Agents ensure current state equals desired state
4. **Operations via Pull Request** - Changes happen through peer-reviewed PRs

## GitOps Benefits

### Complete Traceability
```
Code commit → PR review → Merge → Automatic deployment
```
Every change is auditable and traceable.

### Declarative vs Imperative
```yaml
# GitOps (Declarative)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  image: myapi:v1.2.3
```

Versus imperative scripts that say "how" instead of "what".

### Disaster Recovery
If the cluster is destroyed, recreating is simple:
```bash
argocd app sync production
```
Everything lives in Git!

## ArgoCD vs Flux

### ArgoCD
- Visual dashboard
- UI to manage applications
- Better for teams starting out
- Pull model with polling

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/myrepo
    targetRevision: HEAD
    path: k8s/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### Flux
- CLI-first
- More flexible and composable
- Notification webhooks
- Faster push model

```yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: my-repo
spec:
  interval: 1m
  url: https://github.com/myorg/myrepo
  ref:
    branch: main

---
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: production
spec:
  interval: 10m
  sourceRef:
    kind: GitRepository
    name: my-repo
  path: ./kustomize/production
```

## Best Practices

### 1. Separate Config from Code

```
myrepo/
  ├── src/                 # Application code
  │   ├── main.go
  │   └── Dockerfile
  └── k8s/
      ├── base/
      │   ├── deployment.yaml
      │   ├── service.yaml
      │   └── kustomization.yaml
      ├── overlays/
      │   ├── dev/
      │   ├── staging/
      │   └── prod/
```

### 2. Pull Requests for Infrastructure

```
# Before: direct deploy (risky!)
kubectl set image deployment/api api=myapi:v1.2.3

# After: via PR (safe!)
# PR changes k8s/prod/deployment.yaml
# Auto-merge → Auto-deployment
```

### 3. Drift Detection

ArgoCD/Flux detect divergences:
```
Desired State (Git) ≠ Actual State (Cluster) → Alert!
```

### 4. Secrets Management

Use **Sealed Secrets** or **External Secrets Operator**:

```yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-password
spec:
  encryptedData:
    password: AgBy3i+... # Encrypted, safe to commit
```

## Practical Implementation

### Day 1: Set Up ArgoCD

```bash
# Install
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Add repo
argocd repo add https://github.com/myorg/myrepo --username [user] --password [token]

# Create application
argocd app create my-app \
  --repo https://github.com/myorg/myrepo \
  --path k8s/production \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace production
```

### Day 2: Enable Auto-Sync

```bash
argocd app set my-app --auto-prune --self-heal
```

Now any merge to `main` will sync automatically!

## Conclusion

GitOps is not just a tool, it is a **cultural shift**. It enables:

✅ Every change traceable in Git  
✅ Safer deploys via PRs  
✅ Fast disaster recovery  
✅ Consistent experience across environments  
✅ Built-in compliance and auditability  

If your organization still deploys manually, **it is time to move to GitOps**.
