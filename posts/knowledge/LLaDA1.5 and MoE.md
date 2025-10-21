---
title: DLLM文献阅读
date: 2025-10-20
tags: [文章阅读, 扩散语言模型, MoE]
---

# LLaDA 1.5: Variance-Reduced Preference Optimization for Large Language Diffusion Models

上次读完 LLaDA-V 后就在想为什么推理增强训练不使用基于强化学习的方法。然后就找到了这篇文章，依然是那些作者，甚至日期同样是 25 年 5 月。

在这篇文章中，作者基于 DPO（一种强化学习微调方法）提出了适用于扩散语言模型的 **方差减小策略最优化**（Variance-Reduced Policy Optimization，VRPO）。简单来说，由于 MDM 不能像自回归模型那样使用一堆条件概率的乘积作为整条序列的概率。所以 MDM 不能直接得到 DPO 训练需要的精确对数似然，MDM 需要使用证据下界（Evidence Lower Bound, ELBO）代替对数似然，但是 ELBO 需要使用蒙特卡洛方法进行估计。又但是呢，使用蒙特卡洛方法估计会带来不小的噪声。

作者在这里引入一条公式定理，他认为只要把偏好得分估计量（reward）的方差降下去，损失里的偏差和方差也会一起降低，这样训练会更加稳定。圈圈又绕绕（笑，emmmm 这一段可能难以理解，但是没关系，只需要看最后的结论就足够了）。

## 如何具体降低偏好方差

关于如何具体降低偏好方差，作者提出了三种方法：
1. **采样预算**：多采几次，尽量在不同的掩码比例下采样。
2. **最优分配**：在比较优化模型和参考模型时，要确保使用的是相同的随机样本。
3. **对偶采样**：在采样时，进行对偶策略，确保更均衡的采样分布。

整体来说也非常符合直觉。

看完这篇文章，从方法上来说是可以无缝迁移到 GRPO 中的。但是作者依然采用的是 DPO 作为基线，我认为是为了方便讲解 VRPO，或者 GRPO 训练需要的算力资源太多。不过说到算力资源，或许可以尝试设置一个动态分配的采样预算，比如先前采样的方差大于某个阈值就再增加些采样数，方差小就不增加或者减少。这可能会进一步降低预算。

---

# LLaDA-MoE: A Sparse MoE Diffusion Language Model

这篇文章是 25 年 9 月份的文章，作者人数也达到了 20+。这篇文章尝试将 **混合专家模型（MoE）** 引入扩散语言模型，而且效果看起来也不错，仅仅使用 1B 激活参数就超越了先前 8B 的 LLaDA 模型。
![LLaDA方法](https://raw.githubusercontent.com/feng1201/my_blog/main/images/LLaDA_moe_method.png)


同时他们的 MoE 实现方法也并不复杂。首先使用一个线性网络从隐状态输出各个专家模型的 logit，然后采用 top‑k 门控 MoE 层启用专家。并将专家的输出通过 softmax 加权求和。同时，为了缓解负载不均衡问题，作者引入了一个辅助损失，尽量使得专家被使用的频率比较相似。实现上就是对被使用概率比较高且分配 token 多的专家施加约束，尽量拉平各个专家的负载，尽量多地利用专家模型的参数。

这篇文章读起来，感觉是将已有的 MoE 做法移植到了 MDM 范式上，跑通实验和训练流程证明其有效性（虽然实验显示依然比不上 Qwen2.5-3B-Base）。不过值得一提的是，这篇文章的 MoE 训练流程非常复杂，可能是由于 MDM 本身就难以稳定训练再加上 MoE 路由（笑，emmm 难上加难）。这里放个图感受一下训练流程的复杂性。
![LLaDA方法](https://raw.githubusercontent.com/feng1201/my_blog/main/images/LLaDA_moe_training.png)
后面我把实验的结果放一下。
![LLaDA方法](https://raw.githubusercontent.com/feng1201/my_blog/main/images/LLaDA_moe_result.png)


